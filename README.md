# Strip Json Comments

First, install [Nextjs with typescript](https://nextjs.org/docs/basic-features/typescript).
Then install [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs).

```bash
# Next js
npx create-next-app@latest --ts # next js with tailwind

# Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install clsx # conditional tailwind classes

# Additional packages
npm install react-icons # for sun, moon, and default
npm install @headlessui/react@latest # for nice react components
```

## Dark Mode

To enable class based [dark mode](https://javascript.plainenglish.io/how-to-create-light-and-dark-mode-toggle-in-next-js-with-tailwind-61e67518fd2d), it is necessary to add `darkMode: class`
to `tailwind.config.js`.
Then we just need to edit the classnames at the root of the document to either have `dark` or not have `dark`.
This can be done with
`document.documentElement.classList.add("dark")` or `document.documentElement.classList.remove("dark")`.

The third use effect block in the `useTheme` hook seems to be used for detecting changes in the system theme.
When I remove it, and then change the theme in my iPhone, the theme doesn't change automatically.
I have to refresh.
When I include it, and I change the theme in my iPhone, the theme changes automatically.

When I change both `useIsomorphicLayoutEffect` calls to `useEffect` calls,
and then I refresh my browser, I get a flash when I use a the color mode that doesn't match my system theme.
It seems like `useLayoutEffect` is called first.

Based on [this commit message](https://github.com/tailwindlabs/tailwindcss.com/commit/17a1257b92885c7793eea99b829be8ab5b3fb686)
, the `useRef` hook is a tiny optimization.
With the `useRef` hook, `update` is called twice on a page refresh.
When I remove it, `update` is called three times.

Based on [this commit](https://github.com/tailwindlabs/tailwindcss.com/commit/8b359ade3d87e2f0d840523a3204169af2788644),
the `.change-theme` class property was added to the document to force
all elements to transition instantly, via the css below.
In Chakra UI, I noticed that the theme toggle would not toggle everything at once.
So this class address that issue.

```css
.changing-theme,
.changing-theme * {
  transition: none !important;
}
```

To be honest though, I don't really understand the `useTheme` hook in `ThemeToggle.tsx`.
