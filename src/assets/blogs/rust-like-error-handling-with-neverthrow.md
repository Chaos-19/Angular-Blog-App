---
pubDatetime: 2023-05-21
title: Improving Javascript Error Handling using Neverthrow for Rust-like Robustness
slug: rust-like-error-handling-with-neverthrow
tags:
  - javascript
  - typescript
  - nodejs
description: Enhance robust JavaScript coding with Neverthrow. Utilize Rust-like error handling for exception resilience and reliable code.
---

Have you ever used Rust and wished to apply the same error handling techniques in Typescript? Look no further, Neverthrow is here to help. Neverthrow eliminates the need for using **throw** statements and enables strict error checking, similar to Rust's error handling. But before we dive into Neverthrow, let's first explore Rust's approach to handling errors.

Error handling is a critical aspect of robust programming, ensuring that unexpected issues are gracefully handled. If you have experience with Rust, you might have appreciated its powerful error handling techniques.
Rust's error handling is based on the Result type, which is reminiscent of **Option/Either/Future Monads** found in other functional programming languages like Haskell.
This construct provides two possible outcomes: the 'happy path' for successful operations and the error path for handling errors. It's akin to using try-catch blocks but without actually using try-catch.
Let's take a closer look at Rust's Result type and how we can achieve similar error handling capabilities in JavaScript and TypeScript using Neverthrow.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

It's a generic object, returning `Ok()` or `Err()` with the given type. But, one must explicitly **check** or **unwrap** - this is the offical term for checking - in order to access the inner value.
So, with Neverthrow we can have the same functionality in Javascript/Typescript. Here is a quick example.

```typescript
const letsReturnErrAndOk = (variant: "err" | "ok") => {
  return variant === "err" ? err("Returning something silly!") : ok("Everything is good");
};

letsReturnErrAndOk("err");
```

To access the data inside `letsReturnErrAndOk()`, we have to unwrap it. We know it will definitely return `Returning something silly!`. Even though we are certain about the returned value, it is still necessary to be explicit for robustness. Fortunately, Neverthrow offers a couple of ways to unwrap values
There are a couple of ways to unwrap values in Neverthrow.

```typescript
const result = letsReturnErrAndOk("err");
if (result.isOk()) return result.value; // Everything is good
return result.value; // Returning something silly!
```

Or,

```typescript
letsReturnErrAndOk("err").unwrapOr("Whaoooat");
```

In this case signature of this return type will be something like this: `Result<"Everything is good", "Whaoooat">`

And, my personal favorite,

```ts
letsReturnErrAndOk("err").match(
  success => `Returning wrapped message -> ${success}`,
  err => `Returning wrapped error message -> ${err}`
);
```

All of the methods above can be useful for unwrapping the `Result` object. At first glance, this may seem unusual, but it's a mental model designed to handle errors instead of throwing them.

The try-catch mechanism is beneficial when not overused. However, once we go down this path, we find ourselves wrapping everything with try-catch to ensure robustness. If we throw an error for validation purposes, we are obliged to encase our functions within a catch clause. There's simply no alternative.

Let's examine some real-world alternatives. Imagine you're filtering data, but to do this, you must first ensure that data exists. So, how would you accomplish this without using `neverthrow`?

```ts
export const filterData = (data: PrefinedTypeForData | null) => {
  if (!data) throw new Error("Data is missing!");
  const result = filteringSomeStuff(data);
  return result;
};
```

The only way to handle this error is to catch it when calling the function. If we don't, it may backfire. Now, let's see `neverthrow` in action.

```ts
export const filterData = (data: PrefinedTypeForData | null) => {
  if (!data) return err("There is no hotel to filter. Exiting from applyFiltersOnSearchResults()");
  const result = filteringSomeStuff(data);
  return ok(result);
};
```

Now, when we call `filterData()` all we have to do is:

```ts
const results = filerData(data);
if (results.isOk()) return results.value;
else `Something went wrong. Here is the issue ${result.value}`;
```

We've covered both error and success cases in an explicit manner, which also enhances the developer experience by providing clear, traceable error handling.
Instead of tracking down try-catch blocks to find issues, you can follow explicit error checks. This is the core advantage of using `neverthrow`.

Now, let's see real-world Async-Await in action. This is where the traditional try-catch method typically comes into play.
Due to uncertainties such as data availability, network connection, or user inputs, we have to be extremely careful as a lot of things can go wrong.
Imagine we're fetching currency data from a third-party API like https://openexchangerates.org/. As we can't entirely rely on their reliability, we need to anticipate and handle potential errors.
This is the kind of situation where try-catch proves valuable.

```typescript
const jsonClient = axios.create({
  baseURL: "https://openexchangerates.org/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getLatestExchangeRatesFromApi = async (base: "EUR" | "USD" = "USD") => {
  const SECRET_KEY = process.env.SECRET_KEY?.trim();
  if (!SECRET_KEY) throw new Error("Secret key is missing!");

  try {
    const res = await jsonClient.get<ExchangeRateApiResponse>("/latest.json", {
      params: {
        base,
        app_id: SECRET_KEY,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Couldnt fetch the exchange rates from the api");
    throw new Error("Couldnt fetch the exchange rates from the api", {
      cause: error,
    });
  }
};
```

We must ensure that the `SECRET_KEY` is present; if it's not, an error should be thrown.
Similarly, when making HTTP requests, we have to account for potential network failures, as their success can never be completely guaranteed.
In traditional error handling, if we call this function without wrapping it in a try-catch block, any error will propagate until it finds a try-catch block or causes a system failure.
This could potentially result in a 500 error being displayed to the users. To avoid this, let's transform our approach to a more functional style using neverthrow.

```ts
export const getLatestExchangeRatesFromApi = (
  base: "EUR" | "USD" = "USD"
): ResultAsync<ExchangeRateApiResponse, Error> => {
  const SECRET_KEY = process.env.SECRET_KEY?.trim();
  if (!SECRET_KEY) return errAsync(new Error("Exchange rates secret key is missing!"));

  return fromPromise(
    jsonClient
      .get<ExchangeRateApiResponse>("/latest.json", {
        params: {
          base,
          app_id: SECRET_KEY,
        },
      })
      .then(r => r.data),
    originalError =>
      new Error("Couldnt fetch the exchange rates from the api", {
        cause: originalError,
      })
  );
};
```

Thanks to the `fromPromise()` utility provided by neverthrow, which internally handles its own try-catch, we can safely return errors with additional context by utilizing the second callback of `fromPromise()`.
Now, let's explore how we can consume this functionality with neverthrow. Let's consider a scenario where we fetch results from an API and then cache them in our system for faster data retrieval.

```ts
export const setLatestExchangeRatesToCache = async (base: "EUR" | "USD" = "USD") => {
  const cachedExchangeRates = new CachedExchangeRates(base);

  return getLatestExchangeRatesFromApi(base)
    .andThen(res =>
      fromPromise(
        cacheExchangeRates(res),
        originalError =>
          new Error("Couldnt save exchange rates from api to cache", {
            cause: originalError,
          })
      )
    )
    .match(
      () => console.log("Saving exchange rates from api to cache"),
      error => {
        console.error(error.message);
        return null;
      }
    );
};
```

We start by using `andThen()` to extract the inner value, which in this case is the response from the API. Next, we proceed to cache the obtained data. Since this involves another Promise, we need to handle potential side effects, such as network or caching issues. To address this, we wrap the caching process with `fromPromise()` and then utilize `match()`. In the case of the `setLatestExchangeRatesToCache()`, there is no need to return anything; logging the success message is sufficient.

Now that we've covered setting data, let's move on to the 'get' part of our code.

```ts
export const getLatestExchangeRatesFromCache = async (base: "EUR" | "USD" = "USD") => {
  return fromPromise(
    getCachedExchangeRates(),
    originalError =>
      new Error("Couldnt get exchange rates from cache", {
        cause: originalError,
      })
  ).match(
    exchangeRates => {
      console.log("Returning exchange rates from the cache");
      return exchangeRates;
    },
    error => {
      console.error(error.messag);
      return null;
    }
  );
};
```

Moving on to the 'get' function, we approach it in a similar manner. We wrap the Promise using `fromPromise()`, then execute a `match()` on the result. This allows us to gracefully handle both the successful retrieval of data from the cache and any potential errors. When `getLatestExchangeRatesFromCache()` is invoked, it effectively manages any unexpected runtime errors, thereby generating appropriate logs.

### Conclusion

Adopting Neverthrow for error handling in JavaScript and TypeScript brings the robustness of Rust's techniques to your projects. With Neverthrow, you can experience:

Enhanced code robustness and reliability
Improved developer experience and traceability
Clear distinction between success and error paths
Comprehensive error management and handling
Minimized unexpected runtime errors
More resilient and maintainable codebase
Neverthrow offers a range of powerful methods like `map()`, `mapErr()`, `andThen()`, `orElse()`. By leveraging these methods, you can unlock even more flexibility and control in your error handling code.

Start using Neverthrow today and take your error handling to the next level!"
