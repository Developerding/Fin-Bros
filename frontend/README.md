# FINBROS LETS GO

## Guidelines:
- write all components and views in .tsx
- write any reusable functions in .js
- use Pascal casing HelloWorld.tsx
- 

## Start app:
- npm i
- npm run dev

## SPA
- App.tsx is main app file
- main.tsx is the single page HTML file


## Where to find stuff:
- ASSets:
   - css
   -  img (any image/svg files)
- components (any reusable components, make sure it's placed in a generic folder):
   - buttons
   - cards
   - forms
- constants (any reusable Constants)
- functions (any reusable functions)
- routes (all routing stuff)
- views (actual screen, also ensure it's placed in generic folder):
   - Login
      - Login.tsx
- stores (state management stuff)




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
