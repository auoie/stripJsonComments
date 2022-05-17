# Notes

My first draft was in `./withMonacoReact/`.
I just used a React Monaco package that downloaded Monaco from a CDN.
I didn't like that because it showed a loading state.
Though, one nice thing about that draft was I had a quick theme transition that was implemented via an event listener on the
classes of the html head div.

My second draft was in `./plain/`.
I basically just used a `text-area`.
This was relatively easy.

My third draft was `vite-react-monaco`.
This uses the `vite` bundler to handle bundling.
To use it, I referred to the [samples](https://github.com/microsoft/monaco-editor/tree/main/samples)
of the monaco GitHub repository.
A useful reference to include monaco in React was [this repository](https://github.com/react-monaco-editor/react-monaco-editor)

This automatically is built and deployed with `rsync` to a remote VPS using GitHub actions.
