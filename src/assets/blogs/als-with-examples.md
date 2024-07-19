---
author: Oguzhan Olguncu
pubDatetime: 2023-01-21
modDatetime: 2023-01-21
title: Async Local Storage with Examples in NextJS/Typescript
slug: als-with-examples
featured: false
draft: false
tags:
  - typescript
  - nodejs
  - nextjs
description: There is way to persist some states within NodeJS without passing parameters around. Today we will discover how to use Async Local Storage with Typescript within NextJS.
---

## Table of Contents

Have you ever needed a way to persist a state or logic without argument drilling? Before answering this, let's take a look at the argument drilling example first.

```JS
const handle = (req, res) => {
  /* Some API Logic here*/
  getActiveUsers(req)
}

const getActiveUsers = (req) => {
  /* Get some users from DB */
  const data = FakeDB.get("Users", u => u.id === req.userId)
  getAssociatedStuff(req)
}

const getAssociatedStuff = (req) => {
   /* Get related items */
   const data = FakeDB.get("UserProducts", u => u.id === req.userId)
   checkIfAvailable(req,data)
}

const checkIfAvailable = (req, data) => {
  /* Checking if data is valid */
  if(data) {
    /* Change data accordingly */
  }
}
```

Let's say this `handler` is an API handler in the NextJS, and we want to query the DB to get some data. And we also want to abstract some of the logic into other functions for readability and maintainability purposes.
There is no way but to pass those `req` and `data` as arguments to achieve this.

Now, if you are familiar with React, you might think; if we were operating in React, we could wrap the parent function with a `Context` and could easily
access `req` and `data`. If that's the case we have something similar in NodeJS that can help us. It's called Async Local Storage.

When you first heard this - Async Local Storage -, your initial thoughts probably were, "It should be like Local Storage in the browser, right?"
Actually, yes. The way we handle the ALS is quite similar to the browser Local Storage. When we need the store values, we can call `getStore()` and mutate its state however we want.

In our example above, we had to pass `req`to get the userId from the request body. But now, we can do this instead.

## Intro To Async Local Storage

```JS
import { AsyncLocalStorage } from 'async_hooks'
export const storage = new AsyncLocalStorage()

const handle = (req, res) => {
  const store = {
    userId: req.userId
  }
  storage.run(store, async () => {
    /* Some API Logic here*/
    getActiveUsers(req)
  });

}

const getActiveUsers = () => {
  /* Get some users from DB */
  const store = storage.getStore()
  const data = FakeDB.get("Users", u => u.id === store.userId)
  store.activeUsersData = data

  getAssociatedStuff(req)
}

const getAssociatedStuff = () => {
   /* Get related items */
   const store = storage.getStore()
   const data = FakeDB.get("UserProducts", u => u.id === store.userId)
   checkIfAvailable(data)
}

const checkIfAvailable = (data) => {
  /* Checking if data is valid */
  const store = storage.getStore()
  if(store.activeUsersData || data) {
    /* Change data accordingly */
  }
}
```

So, what changed? First, we need an instance of AsyncLocalStorage, and we always have to access the same instance not to lose context. Then, we need to prepare the storage for context sharing/data passing by calling `storage.run()`.
The `run` function accepts two arguments, one for the context/store to be shared across and a callback function to wrap inner functions. In our case, we just moved everything that requires context data into storage callback.
The final part is pretty simple, all we have to do is call the `getStore()` to get the current store.

> Note that if we try to access `getStore` outside of the context if will return `undefined`.

Now that we got the basics done, let's implement a logging utility for SSR with Typescript.

## Logging with Async Local Storage in NextJS SSR

```typescript
import { AsyncLocalStorage } from "async_hooks";
export const storage = new AsyncLocalStorage();

type ALS = {
  requestReport: { request: RequestReport };
  statusCode?: number;
  requestId: string;
  startTime: number;
  resolvedUrl?: string;
};

type RequestReport = {
  statusCode?: number;
  ip?: string;
  region?: string;
  path: string;
  host: string;
  method: string;
  scheme: string;
  userAgent?: string | null;
};

const generateRequestMetaSSR = (req: IncomingMessage): RequestReport => {
  return {
    path: req.url!,
    method: req.method!,
    host: getHeaderOrDefault(req, "host", ""),
    userAgent: getHeaderOrDefault(req, "user-agent", ""),
    scheme: "https",
    ip: getHeaderOrDefault(req, "x-forwarded-for", ""),
  };
};

const getHeaderOrDefault = (
  req: NextApiRequest | IncomingMessage,
  headerName: string,
  defaultValue: any
) => {
  return req.headers[headerName] ? req.headers[headerName] : defaultValue;
};

export function createALSStore(req: IncomingMessage, resolvedUrl?: string): ALS {
  const requestMetaData = generateRequestMetaSSR(req);
  const store: ALS = {
    startTime: Date.now(),
    requestReport: { request: requestMetaData },
    requestId: nanoid().slice(0, 12),
  };
  if (resolvedUrl) {
    store.resolvedUrl = resolvedUrl;
  }
  return store;
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const store = createALSStore(req);
  return await storage.run(store, async () => {
    try {
      await getBrokenProductsFromDb();
      await getDataFromDbOrCache();
      await getProductsFromDB();
    } catch (error) {
      console.error("Something went wrong.");
    } finally {
      const store = storage.getStore() as ALS;
      console.log(`ElapsedTime ${Date.now() - store.startTime}`, "UserReqId", store.requestId);
    }

    return {
      props: {},
    };
  });
}
```

With this implementation, we can easily access store values across functions within SSR and log stuff in the way we want. The Async Local Storage can be used for many things
this very example is just one of its applications. The same approach can also be implemented for NextJS API.

For more information please check links below:

- https://nodejs.org/api/async_context.html
- https://blog.kuzzle.io/nodejs-14-asynclocalstorage-asynchronous-calls
