---
pubDatetime: 2022-08-04
title: Build Your Own SSR/SSG From Scratch with Vite and React
slug: react-ssr-ssg-from-scratch
tags:
  - javascript
  - typescript
  - ssr
description: Build your own server side rendering with Vite, React and Typescript. SSG Included.
featured: true
---

Today, we'll try to uncover how NextJS, RemixJS and many other SSR frameworks work under the hood.
Even though they are very complicated frameworks the fundamental idea is in fact very straightforward.
As an end-user, we can't really see the simple steps - _building SSR out of React components or just simple HTML and JS_ - due to lots of abstraction in the frameworks to make our lives easier.
But, today we will try to deep dive and see what hides beneath all the abstraction and explore the concept itself.

### What is SSR

Server Side Rendering has become so popular thanks to NextJS, but what is this SSR? Server Side Rendering, as already stated, actually renders your components in the server. It means the server actually doing the heavy lifting before responding to the upcoming
requests. If you are doing SSR with React you will need to invoke `ReactDOMServer.renderToString` in your server to render your components. There are some caveats if you go down that path.

TTFB(Time To First Byte) will be slower than CSR, because your server now needs to render the components into a HTML file, and, then return it. But, unlike CSR, users don't need to wait for
whole JS bundle to be parsed - they can immediately see the pages - but they cannot interact with it until it gets **hydrated** - which we will later explain.

### Why do we need SSR and why not use CSR instead

When you use CSR to build an app, you are not shipping any HTML files, instead, they get created when the user enters your site. Until the user or search engine, crawler enters your website, all
they get is that famous `index.html` file:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Example CSR</title>
  </head>
  <body>
    <div id="root">---ENTIRE CONTENT WILL BE RENDERED IN HERE ON THE CLIENT---</div>
  </body>
</html>
```

Once someone enters your website, DOM elements get created inside the `root` like this with the help of `React.createRoot` function.

```html
<div id="root">
  <div>Text-1</div>
  <div>Text-2</div>
  <div>Text-3</div>
</div>
```

All this dynamically happens when your site is invoked.

So, how does a crawler understand your sites meta data - descriptions, titles, og tags, etc... ?
Or, what if DOM elements like `Text-1`, `Text-2` are just static and does not need JS to be there?
If you go with CSR, you are shipping everything with the JS bundle and neglecting SEO metadata.
But if you go with SSR, you can generate those HTML elements and SEO tags beforehand to ship less JS code and make your site more open to crawlers.

### What is Hydration and Why do We Need It

The Hydration is a process of supplying the JS code for server-side generated pages. Let's elaborate.

When you render components on the backend with `ReactDOMServer.renderToString` it actually attaches all the event handlers and necessary imports for the code to work.

Example SSR JS output:

```javascript
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import * as jsxRuntime from "react/jsx-runtime";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function About() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("h1", {
      children: "About",
    }),
  });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: About,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
```

We have pretty much all we need, but with a caveat, we are missing React and ReactDOM in our `index.html` file. Our `useEffect`, `useState` or event handlers won't work without the React imports.

![Page without Hydration](/blog-images/react-ssr-ssg-from-scratch/sponge.webp)

We can imagine the page as a dry sponge - all the `useEffect`, `useState`, handlers, and listeners waiting for the hydration to work. Then once we hydrate the page with parsed JS code, all the UI elements will be interactable. Just like turning a dry sponge into a watery sponge because a sponge is quite useless - without water, it won't work, just like our page.

The reason I say parsed JS code a couple of times throughout the article is to make a point. SSR is fast but it takes time to hydrate to page because all the JS code needs to be parsed to fully hydrate.

### Why Vite over Webpack

Vite was created by the same person who created VueJS to increase the DX. It uses `esbuild` for development under to hood to bundle the code faster. Thanks to esbuild we get incredibly fast
Hot Module Replacement (HMR), fast server starts compared to Javascript-based bundlers like Webpack. Also, uses Rollup for production builds, since it's more mature than esbuild in some manners.

Overall,

- Better DX - due to easier configuration
- Instant server start - uses ESM for local development
- Lightning Fast HMR

### Building the SSR

We will start off with installing dependencies,

```bash
npm i react@latest react-dom@latest react-router-dom@latest
npm i --save-dev @types/react @types/react-dom @vitejs/plugin-react compression cross-env express serve-static typescript vite
```

[🔗 Project's Github address](https://github.com/ogzhanolguncu/ssr-react-typescript-vite)

Before moving forward with the server side we need to configure Vite. Luckily all it takes is a few lines.

#### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
  },
});
```

And, will create a index.html file to run all the JS code.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR React/Typescript App</title>
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>
```

Just like a regular React app, we will create a `src` folder consists of,

```bash
src
  pages
    About.tsx
    Home.tsx
  App.tsx
  entry-client.tsx
  entry-server.tsx
vite.config.js
index.html
server.js
prerender.js
package.json
```

Let's start with `entry-client.tsx`

```typescript
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

ReactDOM.hydrateRoot(
  document.getElementById('app')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

Similar to `index.ts` files in React apps, it has `ReactDOM.hydrateRoot` and root id to render our entire application inside a div. The only difference in our `index.ts` is instead of sticking with
`ReactDOM.createRoot` we opted for `ReactDOM.hydrateRoot` because we'll render server-side generated code instead of directly invoking it on the client.

Moving on with `entry-server.tsx`

```typescript
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';

export function SSRRender(url: string | Partial<Location>) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
```

To render our React application in node, we need to call `ReactDOMServer.renderToString`, and instead of using [BrowserRouter](https://reactrouter.com/docs/en/v6/routers/browser-router) we need to call [StaticRouter](https://reactrouter.com/docs/en/v6/routers/static-router) with location to provide current location.

Time to get to the most crucial part of our client side,

```typescript
import { Link, Route, Routes } from 'react-router-dom';

const PagePathsWithComponents = import.meta.glob('./pages/*.tsx', { eager: true });

const routes = Object.keys(PagePathsWithComponents).map((path: string) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1];
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: PagePathsWithComponents[path].default,
  };
});

export function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />} />;
        })}
      </Routes>
    </>
  );
}
```

We'll follow the NextJS type of routing system, which creates routes based on the folder structure. For that, we'll use Vite's `import.meta.glob`. This piece of code
let us import multiple modules at a time. The output will be something like this:

```javascript
const modules = {
  "./pages/About.tsx": () => import("./pages/About.js"),
  "./pages/Home.tsx": () => import("./pages/Home.tsx"),
};
```

After we've collected all the routes, we'll iterate over them to create routes and links for navigation.

Let's create our pages.

#### pages/Home.tsx

```typescript
export default function Home() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>Home</h1>
      <br />
      <div>Button clicked {counter} times</div>
      <button onClick={() => setCounter((prevState) => prevState + 1)}>Click me!</button>
    </>
  );
}
```

#### pages/About.tsx

```typescript
export default function About() {
  return <h1>About</h1>;
}
```

These are just basic pages with some JSX in them. But, For `Home.tsx`, we've sprinkled some React magic to test how `useState` acts without hydration. We'll do that in a minute.

Now, with the help of ExpressJS and Vite, we will serve our SSR app over a server.

#### server.js

```javascript
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

export async function createServer() {
  const resolve = p => path.resolve(__dirname, p);

  let vite = null;

  app.use((await import("compression")).default());
  app.use(
    (await import("serve-static")).default(resolve("dist/client"), {
      index: false,
    })
  );

  app.use("*", async (req, res) => {
    const url = "/";

    const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
    const render = (await import("./dist/server/entry-server.js")).SSRRender;

    const appHtml = render(url); //Rendering component without any client side logic de-hydrated like a dry sponge
    const html = template.replace(`<!--app-html-->`, appHtml); //Replacing placeholder with SSR rendered components

    res.status(200).set({ "Content-Type": "text/html" }).end(html); //Outputing final html
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3033, () => {
    console.log("http://localhost:3033");
  })
);
```

We'll first read our `index.html` to replace rendered components inside the root id. Then, we'll call the `SSRRender` function in our `entry-server.js` and pass the initial URL. In our case, it's a homepage.
Finally, we replace `<!--app-html-->` with rendered content.

Pretty simple, eh? That's how most of the modern SSR frameworks work under the hood. Of course, they add all kinds of features and optimizations to those frameworks to improve the workflow.

Let's try building and serving our application. But, first, we need to create a package.json file.

```json
{
  "name": "ssr-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --ssr src/entry-server.tsx --outDir dist/server",
    "generate": "vite build --outDir dist/static && npm run build:server && node prerender",
    "serve": "cross-env NODE_ENV=production node server"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6",
    "@vitejs/plugin-react": "^2.0.0",
    "compression": "^1.7.4",
    "cross-env": "^7.0.3",
    "express": "^4.18.1",
    "serve-static": "^1.15.0",
    "typescript": "^4.7.4",
    "vite": "^3.0.0",
    "prettier": "^2.7.1"
  }
}
```

Now,

```bash
npm run build && npm run serve
```

There we go. We got ourselves a brand new SSR app. Now to understand why people making so much fuzz about hydration, we'll discover how SSR work without client-side Javascript files.

Go to `dist\client\index.html` file and try deleting script file.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR React/Typescript App</title>
    <script type="module" crossorigin src="/assets/index.6581eae8.js"></script>
    --> Delete this
  </head>
  <body>
    <div id="app"><!--app-html--></div>
  </body>
</html>
```

Now, try to serve your application again and see if your counter button - the button we've used with `useState` - works. Go ahead. I'm not going anywhere 'till you have an 'aha' moment.

That's right, without client-side logic - hydration. Pages would be entirely static without any interactions. But what if we already know that pages will be static and want to render each page individually? That's right. We need prerender - SSG.

## SSG on top of SSR

Since we already know the concepts by now this will be a walk in the park.

#### prerender.js

```javascript
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = p => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const render = (await import("./dist/server/entry-server.js")).SSRRender;

// determine routes to pre-render from src/pages
const routesToPrerender = fs.readdirSync(toAbsolute("src/pages")).map(file => {
  const name = file.replace(/\.tsx$/, "").toLowerCase();
  return name === "home" ? `/` : `/${name}`;
});

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const appHtml = render(url);

    const html = template.replace(`<!--app-html-->`, appHtml);

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
  }
})();
```

This function uses the same logic as SSR and creates separate files for each page that are known ahead of time, but we won't be able to change anything after the build phase. That's why it is called 'Static'.
Following that approach is extremely valuable for sites like blogs, documentation sites, E-commerce product listings. Basically, things that do not change often.

To run this code,

```bash
npm run generate
```

Then, use a tool like [Serve](https://www.npmjs.com/package/serve) to run generated code,

```bash
serve dist/static
```

I hope we've uncovered some of the underlying logic of SSR and SSG and helped you understand the thought processes better.

Stay tuned.
