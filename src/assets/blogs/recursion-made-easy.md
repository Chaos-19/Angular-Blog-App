---
pubDatetime: 2022-11-20
title: Recursion made easy with Javascript
slug: recursion-made-easy
tags:
  - javascript
  - tutorial
description: We`ll be learning recursion with Javascript, but without Fibonacci. We`ll also explore Haversine formula to calculate distance between coordinates.
---

Today, we will be learning **Recursion** but without the Fibonacci. Each time someone tries to teach recursion using the Fibonacci a panda dies somewhere in the world. Just kidding, but hear me out.
I don't think a Fibonacci is an intuitive way to teach someone the concept of recursion. When I started programming and learned the concept of recursion through the Fibonacci, it didn't ring a bell for me. Because the examples we worked on was irrelevant to real-world problems, it was hard to make connections to establish a good mental model.

Then I started reading that great book called [Grokking Algorithms](https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230/), and it finally started to make sense.
By the way, I recommend that book to anyone who wants to improve their CS foundation. Anyway, let's get back to the topic.

Recursion or recursive functions are functions that keeps calling themselves. But wait, that doesn't make any sense, right? If we keep calling the same function continuously, we will eventually
get stack overflow, right? Because the function will try to call itself until it runs off the memory. That's right. That's why recursive functions require a base case.

### But, what is a base case?

Let's examine this function together.

```javascript
const printNumber = (startingNumber = 0) => {
  console.log(startingNumber);
  return printNumber(startingNumber + 1);
};
printNumber();
```

There we go, we got ourselves non-fibonnaci recusive function. Since we didn't tell the function to where to stop, it will run untill it runs of the memory. What we could do is we could define a simple base case to prevent infamous stack overflow instead.

```javascript
const printNumber = (startingNumber, whereToStop) => {
  console.log(startingNumber);
  if (startingNumber === whereToStop) return;
  return printNumber(startingNumber + 1, whereToStop);
};
printNumber(0, 7);
```

I think, we have a good understanding of simple usage of recursion by now. Now, let's see recursion in action.

### Finding closest hotels to our anchor hotel.

In this example we will be using these hotel locations in the Istanbul, because, why not. [Hotel locations in Istanbul](https://ogzhanolguncu.com/static/locations.json).
And to calculate distance between coordinates using lat/lng, we'll use [Haversine Distance](https://www.npmjs.com/package/haversine-distance) this package is simply the implementation of this famous formula [Haversine](https://en.wikipedia.org/wiki/Haversine_formula).

Let's code.

```javascript
import haversineDistance from "haversine-distance";
const locations = []; // You can get these from https://ogzhanolguncu.com/static/locations.json

const anchor = {
  latitude: 41.009367,
  longitude: 28.963431,
};

const THRESHOLD = 20;
const DESCREASE_AMOUNT = 1000;

const getHotelsCloseToAnchor = (locations, anchor, distanceInMeters = 4000) => {
  const calculatedDistances = locations.map(loc => haversineDistance(anchor, loc));
  const closeLocations = calculatedDistances.filter(x => x > distanceInMeters);

  if (closeLocations.length >= THRESHOLD) return closeLocations;

  return getHotelsCloseToAnchor(locations, anchor, distanceInMeters - DESCREASE_AMOUNT);
};
getHotelsCloseToAnchor(locations, anchor);
```

We'll start importing the `haversine` package, defining our locations and the anchor. Then, we define the `THRESHOLD`. This is the base case for our recursive function. It needs to know when to stop. The `DESCREASE_AMOUNT`, we will get to that later.

To compare all the locations against an anchor, we need to map the entire locations array and call `haversineDistance()`. This function accepts two arguments; one for the anchor - starting point - and one for the point to compare against - ending point -.
Both of these arguments have to contain this:

```javascript
{lat: 41, lng: 26} or {latitude: 41, longitude: 26}
```

After we mapped all the locations, what we end up is this:

```javascript
const calculatedDistances = [2125, 3150, 2300, 2878, 4084, 3892, 3853, ......] // And possibly more
```

And, we need to find at least `THRESHOLD` amounts of hotels in given `distanceInMeters`. And if base case is not adequate, we will keep calling `getHotelsCloseToAnchor()` while descreasing the
`distanceInMeters` with `DESCREASE_AMOUNT`. This process will keep running until we hit at least `THRESHOLD` amount of hotel results.

This function might seem okay, but we are still vulnerable to stack-overflow error. If your data is dynamic and changing with every request you make, you need to be cautious about guard conditions.
There is a guard condition that we can add to our recursive function to prevent this error. I'll leave this to you as an exercise. I'll leave the answer below, but please give some thoughts first.

### Find the stack-overflow vulnerability in the function above. 👆🏻👆🏻👆🏻

```javascript
const THRESHOLD = 20;
const DESCREASE_AMOUNT = 1000;

const getHotelsCloseToAnchor = (locations, anchor, distanceInMeters = 4000) => {
  if (locations.length < THRESHOLD) return; // ANSWER✅✅✅

  const calculatedDistances = locations.map(loc => haversineDistance(anchor, loc));
  const closeLocations = calculatedDistances.filter(x => x > distanceInMeters);

  if (closeLocations.length >= THRESHOLD) return closeLocations;

  return getHotelsCloseToAnchor(locations, anchor, distanceInMeters - DESCREASE_AMOUNT);
};
getHotelsCloseToAnchor(locations, anchor);
```

To begin with, the length of the locations has to be satify the `THRESHOLD`. If you want to experience the stack-overflow you can set locations length to **19** and see if it works. There might be more cases to consider while implementing a recursive function, but in our case that's quite enough.

Huge thanks to my company [Wndr](https://www.linkedin.com/company/justwndr) for inspiring me for this blog post.

Thank you for reading.
