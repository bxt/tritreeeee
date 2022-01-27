# Tritreeeee

*(With 5 × e)*

This is a web site that allows to display and edit "Tritrees" as inspired by [Jeff
aka @ippsketch's Tweet](https://twitter.com/ippsketch/status/1414947706968199170/photo/2).
You can create all kinds of shapes from triangles, by subdeviding and rotating them.
There's 4 render modes and 3 color shemes available.

[You can find it running here](https://bxt.github.io/tritreeeee/).

## Gallery

These are some sreenshots from the app:

<img src="https://user-images.githubusercontent.com/639509/151454203-b2a5b64d-efad-421a-ab4c-ec87ec3191b6.png" width="48%"><img src="https://user-images.githubusercontent.com/639509/151454205-1368ce55-e6ec-4f7a-8d54-837340cb2253.png" width="48%"><img src="https://user-images.githubusercontent.com/639509/151454174-43fa60e4-0cc8-49b7-86d8-14c745c07192.png" width="48%"><img src="https://user-images.githubusercontent.com/639509/151454188-5cad6d27-056d-4263-8783-09e241b547e5.png" width="48%"><img src="https://user-images.githubusercontent.com/639509/151454197-36ab620c-7d13-466b-a93d-07d00f360428.png" width="48%"><img src="https://user-images.githubusercontent.com/639509/151454870-8e82484d-bbee-4eb4-9b1f-81df18d6212e.png" width="48%">

## Developing

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that uses web technologies like [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/), [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/).

To get started run

```bash
npm install
```

Developing works best if you use an IDE with TypeScript and ESLint support built-in. Then just start the dev server:

```bash
npm run dev
```

Open <http://localhost:3000/tritreeeee> with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Before committing, you should run the linters, just in case you missed something:

```bash
npm run lint
```

In the end you can build and export all the required files to the `out` directory using:

```bash
npm run build
```

That's it!

There are some GitHub actions to lint and build the app, as well as building the `main` branch and copying the results to the `gh-pages` branch for deploying to GitHub pages at <https://bxt.github.io/tritreeeee/>.
