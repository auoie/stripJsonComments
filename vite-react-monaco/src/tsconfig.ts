const tsconfig = `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "useUnknownInCatchVariables": true /* Type catch clause variables as 'unknown' instead of 'any'. */,
    "alwaysStrict": true /* Ensure 'use strict' is always emitted. */,
    "noUnusedLocals": true /* Enable error reporting when a local variables aren't read. */,
    "noUnusedParameters": true /* Raise an error when a function parameter isn't read */,
    "exactOptionalPropertyTypes": true /* Interpret optional property types as written, rather than adding 'undefined'. */,
    "noImplicitReturns": true /* Enable error reporting for codepaths that do not explicitly return in a function. */,
    "noFallthroughCasesInSwitch": true /* Enable error reporting for fallthrough cases in switch statements. */,
    "noUncheckedIndexedAccess": true /* Include 'undefined' in index signature results */,
    "noImplicitOverride": true /* Ensure overriding members in derived classes are marked with an override modifier. */,
    "noPropertyAccessFromIndexSignature": true /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`;
export default tsconfig;
