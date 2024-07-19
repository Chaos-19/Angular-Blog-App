## You can actually mutate imports in Javascript

**Published:** 2022-07-03

**Tags:** `javascript`

**Description:** Do you know you can actually mutate an imported object in JS? Today, we will see how to mutate and avoid mutation for imported objects.

**Blog Post:**

In the world of JavaScript, imports are often perceived as immutable entities. You bring in a module, use its functions and variables, and assume they remain untouched. However, there's a subtle nuance to this: **you can indeed mutate an imported object**.

Let's dive into this intriguing aspect of JavaScript imports with a practical example.

```javascript
// importedModule.js
const myObject = {
  name: "John",
  age: 30,
};

export default myObject;
```

```javascript
// main.js
import myObject from "./importedModule";

console.log(myObject); // { name: "John", age: 30 }

// Mutating the imported object
myObject.age = 35;

console.log(myObject); // { name: "John", age: 35 }
```

In this example, we import `myObject` from `importedModule.js`. Then, we directly modify the `age` property of `myObject`. This mutation affects the original object within `importedModule.js`.

**Why this might be problematic:**

* **Unexpected side effects:** If multiple parts of your code rely on `importedModule.js`, changes made in one part might unexpectedly affect other parts.
* **Difficult debugging:** Tracking down the source of unexpected behavior becomes challenging when you're dealing with potentially mutated objects.

**Strategies for avoiding mutation:**

* **Use spread syntax:** Create a copy of the object before making modifications.

```javascript
import myObject from "./importedModule";

const updatedObject = { ...myObject, age: 35 };

console.log(myObject); // { name: "John", age: 30 }
console.log(updatedObject); // { name: "John", age: 35 }
```

* **Use Object.assign():** Merge properties of the original object into a new object.

```javascript
import myObject from "./importedModule";

const updatedObject = Object.assign({}, myObject, { age: 35 });

console.log(myObject); // { name: "John", age: 30 }
console.log(updatedObject); // { name: "John", age: 35 }
```

* **Use immutable data structures:** Libraries like Immutable.js offer immutable data structures that prevent direct modification.

**Key takeaway:**

While you can mutate imported objects, it's generally a good practice to avoid it. By creating copies or utilizing immutable structures, you can maintain the integrity of your imported modules and create a cleaner, more predictable codebase.