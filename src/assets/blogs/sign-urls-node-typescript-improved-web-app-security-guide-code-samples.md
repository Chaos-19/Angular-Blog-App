---
pubDatetime: 2023-03-26
title: Sign URLs with Node and Typescript A Step-by-Step Guide with Code Samples
slug: sign-urls-node-typescript-improved-web-app-security-guide-code-samples
tags:
  - typescript
  - tutorial
  - nodejs
description: Learn how to sign URLs using Node and Typescript for improved security and reliability of your web apps. Step-by-step guide with code samples.
---

Signing a URL is an important security measure that helps to prevent unauthorized access to sensitive information. By signing a URL on our end with a secret key and then verifying it again on our end with the same key, we can ensure that only those who are authorized to access the page are able to do so. Without this security measure, it would be easy for anyone to access the page and view sensitive information that was not intended for them.

In addition to ensuring the safety of the URL, signing also has other benefits. For example, it can help to prevent tampering with the URL, which could lead to security breaches or other issues. By signing the URL, we can be confident that it has not been altered in any way since it was last signed.

Overall, there are many reasons why signing a URL is an important step in ensuring the security of sensitive information. By taking this step, we can help to protect our users from unauthorized access and other security issues. It is an essential component of any comprehensive security strategy and should not be overlooked.

Let's explain this with a real-life example. Suppose we have a page that allows customers to view their recent purchases within a limited amount of time. Since this page is public, anyone can brute-force the `customerId` and access the page, thereby viewing sensitive data of that particular user. To prevent this, we need a method of protection.

We can sign the page URL on our end with a secret key, stored safely in our `env` file, and with a TTL (Time to Live). Then, we can send it to the user. If someone tries to corrupt the URL by changing it, the URL will no longer be valid. If it expires, it also won't be valid anymore. This provides a sense of security for our end users.

Let's move on to the code.

We should first start by defining our types:

```typescript
export interface SignatureOptions {
  secret: string;
  ttl?: number;
  hash?: string;
}

interface SignatureData {
  exp?: number; // exp timestamp
  rndNumber: string; // random number
}
```

When initializing the Signer class, we need three parameters:

- A secret to ensure that the generated result is consistent when encrypted and decrypted
- A TTL to ensure expiration
- A hash algorithm to encrypt text using algorithms such as **SHA25**, **MD5**, and **BLAKE3**.

Now that we have completed this part, we can move on to the implementation.

```typescript
export class Signature {
  private readonly secret: string;
  private readonly ttl: number;
  private readonly hash: (input: string, secret: string) => string;

  constructor(options: SignatureOptions) {
    const { secret, ttl = 0, hash = "sha1" } = options;

    this.secret = secret;
    this.ttl = ttl;
    this.hash = (input: string, secret: string) =>
      createHash(hash).update(input).update(secret).digest("hex");
  }
}
```

This section is quite simple. We start by creating an instance of our class using the provided options. As mentioned earlier, the hash function is responsible for most of the work. It utilizes the built-in [Crypto API](https://nodejs.org/api/crypto.html) to securely hash the given input with a secret key that is stored in our env file.

> Note that secret key shouldn't expose itself to outside and should be a secure long string.

Now that part is done, let's move on to `sign()` method.

## Signing the URL

```typescript
public sign(url: string, signTTL: number): string {
    const data: SignatureData = {
      rndNumber: randomInt(10000000000).toString(),
    }

    const ttl = signTTL ?? this.ttl
    if (ttl) {
      data.exp = Date.now() + ttl * 1000
    }

    const prefixSign = url.indexOf('?') == -1 ? '?' : '&'
    url += `${prefixSign}signed=${querystring.stringify(data as Record<string, string | number>, '-', '_')}`
    url += `-${this.hash(url, this.secret)}`

    return url
  }
```

The `sign` function takes a URL as input and returns a signed URL. To ensure uniqueness, it first creates a `data` object and assigns a random value to it. This guarantees that a new link will be created every time `sign` is called with the same URL.

Next, the function checks if a time-to-live (TTL) value has been provided. If it has, it uses that value; if not, it retrieves the TTL from the constructor. It's important to prioritize external code first (in our case, the `signTTL` parameter) and use the internal code as a fallback. External dependencies are subject to change, whereas the internal code remains constant from the outset.

```typescript
const ttl = signTTL ?? this.ttl;
```

To start, let's get the current timestamp by calling `Date.now()`, which should return `1679830491774`. If you run the code `new Date(1679830491774)` in your browser, you'll be able to discover the creation date of this blog post.
Next, we need to add our `TTL * 1000` to the current timestamp. We multiplied the TTL by 1000 because TTLs are usually in seconds, but expirations are in milliseconds.
This conversion simply changes our data from seconds to milliseconds. After that, we will check if the given URL contains any query parameters.
If it does, we'll append our `exp` and `rndNumber` at the end of the query parameters. Otherwise, we'll create a new query parameter.

This is how it looks in practice.

```typescript
//Given URL: https://ogzhanolguncu.com
//Output: https://ogzhanolguncu.com?hello=world&signed=r_8294326743-exp_1679834926232

//Given URL: https://ogzhanolguncu.com?hello=world
//Output: https://ogzhanolguncu.com?hello=world&signed=rndNumber_5620028336-exp_1679835072523
```

Next, we call `stringify()` on the `data` object, add it to the URL, and attach our hash before returning it.

## Extracting data out of URL

Before verifying our URLs, we need to extract the `hash` and `exp` from the URL. Let's begin by separating the hash from the URL.

```typescript
private extractSignature(str: string): [url: string, sign: string] {
    const pos = str.lastIndexOf("-");
    if (pos === -1) {
      throw new Error("Invalid");
    }
    return [str.substring(0, pos), str.substring(pos + 1)];
  }
```

This is also trivial, but there's a catch. We need to ensure the integrity of URLs by checking if someone has tried to delete the hash from the URL. If the hash is still valid, we simply return the URL and the hash separately.

```typescript
//Given URL: https://ogzhanolguncu.com?hello=world&signed=rndNumber_5620028336-exp_1679835072523-0f3f9488e0b5457b8cb7092d0e3f66a2b91dc69e
//Extracted URL: 'https://ogzhanolguncu.com?hello=world&signed=rndNumber_5620028336-exp_1679835072523'
//Extracted Hash: '0f3f9488e0b5457b8cb7092d0e3f66a2b91dc69e'
```

Now, we need to do the same thing for `data` we embedded inside of the URL.

```typescript
private extractSignatureData(
    url: string
  ): [url: string, signatureData: SignatureData] {
    let pos = url.lastIndexOf("&signed=");
    if (pos === -1) {
      pos = url.lastIndexOf("?signed=");
    }
    if (pos === -1) {
      throw new Error("Invalid");
    }
    return [
      url.substring(0, pos),
      querystring.parse(url.substring(pos + 8), "-", "_") as Record<string, string | number>,
    ];
  }
```

Again, we check the integrity of the URL, then simply break into two pieces.

```typescript
//Given URL: https://ogzhanolguncu.com?hello=world&signed=rndNumber_5620028336-exp_1679835072523'
//Extracted URL: 'https://ogzhanolguncu.com?hello=world'
//Extracted Data: {
//                 rndNumber: '5620028336',
//                 exp: '1679835072523'
//               }
```

Let's move onto the last part.

## Verifying the URL

```typescript
private checkStringSignature(str: string, sign: string): void {
    if (this.hash(str, this.secret) !== sign) {
      throw new Error("Invalid");
    }
  }

public verify(url: string): boolean {
    const [urlWithoutSignature, sign] = this.extractSignature(url);
    this.checkStringSignature(urlWithoutSignature, sign);
    const [originalUrl, data] = this.extractSignatureData(
      urlWithoutSignature
    );

    if (data.exp && data.exp < Date.now()) {
      throw new Error("Expired");
    }

    return Boolean(originalUrl);
  }
```

We begin by invoking our previously defined functions and dividing the URL into parts. This ensures that any attempt to modify the URL will trigger a failure prior to reaching the expiration check, which is desirable.
Next, we validate the integrity of the URL and its `hash` value using our `Crypto API`. Since `crypto.hash()` is deterministic and produces the same results every time it is called, we simply call hash with the secret key and compare it to the sign from the URL. If these values match, we may proceed with the expiration check.
Finally, we inspect the expiration date and verify that it is set for a future date. If not, the process has failed. If all conditions are met, we return `true`.

## Summary

- Do not expose private URLs to the outside without securing them.
- Keep your secret-key in your env file.
- If you are dealing with sensitive data, always keep security in mind.

## Full code

```typescript
import { createHash, randomInt } from "crypto";
import * as querystring from "querystring";

export interface SignatureOptions {
  secret: string;
  ttl?: number;
  hash?: string;
}

type SignatureData = {
  exp?: number; // exp timestamp
  rndNumber: string; // random number
};

export class Signature {
  private readonly secret: string;
  private readonly ttl: number;
  private readonly hash: (input: string, secret: string) => string;

  constructor(options: SignatureOptions) {
    const { secret, ttl = 0, hash = "sha1" } = options;

    this.secret = secret;
    this.ttl = ttl;
    this.hash = (input: string, secret: string) =>
      createHash(hash).update(input).update(secret).digest("hex");
  }

  public sign(url: string, signTTL?: number): string {
    const data: SignatureData = {
      rndNumber: randomInt(10000000000).toString(),
    };

    const ttl = signTTL ?? this.ttl;
    if (ttl) {
      data.exp = Date.now() + ttl * 1000;
    }

    const prefixSign = url.indexOf("?") == -1 ? "?" : "&";
    url += `${prefixSign}signed=${querystring.stringify(
      data as Record<string, string | number>,
      "-",
      "_"
    )}`;
    url += `-${this.hash(url, this.secret)}`;

    return url;
  }

  private checkStringSignature(str: string, sign: string): void {
    if (this.hash(str, this.secret) !== sign) {
      throw new Error("Invalid");
    }
  }

  private extractSignature(str: string): [url: string, sign: string] {
    const pos = str.lastIndexOf("-");
    if (pos === -1) {
      throw new Error("Invalid");
    }
    return [str.substring(0, pos), str.substring(pos + 1)];
  }

  private extractSignatureData(url: string): [url: string, signatureData: SignatureData] {
    let pos = url.lastIndexOf("&signed=");
    if (pos === -1) {
      pos = url.lastIndexOf("?signed=");
    }
    if (pos === -1) {
      throw new Error("Invalid");
    }

    return [url.substring(0, pos), querystring.parse(url.substring(pos + 8), "-", "_") as any];
  }

  public verify(url: string): boolean {
    const [urlWithoutSignature, sign] = this.extractSignature(url);
    this.checkStringSignature(urlWithoutSignature, sign);
    const [originalUrl, data] = this.extractSignatureData(urlWithoutSignature);

    if (data.exp && data.exp < Date.now()) {
      throw new Error("Expired");
    }

    return Boolean(originalUrl);
  }
}

export default function signed(options: SignatureOptions) {
  return new Signature(options);
}
```
