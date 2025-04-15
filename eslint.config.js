import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default [
    jsPlugin.configs.recommended,
    // Global ignores
    { ignores: [".pnp.cjs", ".yarn/"] },

    // Typescript and React
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                projectService: { allowDefaultProject: ["eslint.config.js"] },
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            import: importPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...tsPlugin.configs.stylistic.rules,
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,
            "@typescript-eslint/array-type": ["error", { default: "generic" }],
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "@typescript-eslint/no-deprecated": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    caughtErrors: "none",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/prefer-nullish-coalescing": [
                "error",
                { ignorePrimitives: { boolean: true, string: true } },
            ],
            "@typescript-eslint/strict-boolean-expressions": [
                "error",
                { allowNullableBoolean: true, allowNullableString: true },
            ],
            "import/extensions": ["error", "always", { ignorePackages: true }],
            "import/order": "off",
            "no-duplicate-imports": "error",
            "no-shadow": "error",
            "no-undef": "off", // typescript handles undefined variable detection
            "prefer-const": ["error", { destructuring: "all" }],
            "sort-imports": "off",
            "sort-keys": "off",
        },
        settings: {
            formComponents: ["Form"],
            "import/external-module-folders": [".yarn"],
            "import/internal-regex": "^~/",
            "import/resolver": { typescript: { alwaysTryTypes: true } },
            linkComponents: [
                { linkAttribute: "to", name: "Link" },
                { linkAttribute: "to", name: "NavLink" },
            ],
        },
    },
];
