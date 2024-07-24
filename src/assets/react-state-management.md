

## Taming the complexity of state management in React

**Published:** 2024-08-03

**Tags:** `javascript`, `react`

**Description:** Explore various approaches to state management in React applications and choose the one that best suits your needs.

**Blog Post:**

As React applications grow in size and complexity, managing state becomes a crucial challenge. React's built-in state management with `useState` is sufficient for simple components, but for larger applications, dedicated solutions are needed.

**1. Context API:**

- React's built-in mechanism for sharing state across components without prop drilling.
- Ideal for managing global state that needs to be accessible from various parts of the application.

```javascript
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>
        <MyComponent />
      </div>
    </ThemeContext.Provider>
  );
};

const MyComponent = () => {
  const { theme } = useContext(ThemeContext);

  return <div style={{ backgroundColor: theme === 'light' ? 'white' : 'black' }}>
    {/* Content */}
  </div>;
};
```

**2. Redux:**

- A popular state management library that provides a centralized store for managing state and a predictable way to update it.
- It uses actions and reducers to modify state, offering a robust and structured approach.

```javascript
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* Components */}
      </div>
    </Provider>
  );
};
```

**3. MobX:**

- A library that emphasizes simplicity and reactivity.
- It uses observable objects to track state changes and automatically re-renders components that depend on them.

```javascript
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

class CounterStore {
  @observable count = 0;

  @action increment = () => {
    this.count++;
  };

  @action decrement = () => {
    this.count--;
  };

  @computed get doubleCount() {
    return this.count * 2;
  }
}

const counterStore = new CounterStore();

const App = () => {
  return (
    <div>
      {/* Components */}
    </div>
  );
};

const MyComponent = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <p>Double Count: {counterStore.doubleCount}</p>
      <button onClick={counterStore.increment}>Increment</button>
      <button onClick={counterStore.decrement}>Decrement</button>
    </div>
  );
});
```

**4. Recoil:**

- A state management library developed by Facebook.
- It uses a global, reactive state graph to manage data and offers features like atomicity and selectors for derived state.

```javascript
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const countAtom = atom({
  key: 'count',
  default: 0,
});

const doubleCountSelector = selector({
  key: 'doubleCount',
  get: ({ get }) => get(countAtom) * 2,
});

const App = () => {
  return (
    <div>
      {/* Components */}
    </div>
  );
};

const MyComponent = () => {
  const [count, setCount] = useRecoilState(countAtom);
  const doubleCount = useRecoilValue(doubleCountSelector);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};
```

**5. Zustand:**

- A minimalistic state management library that emphasizes simplicity and ease of use.
- It provides a single `create` function to create a store and uses a reactive system to update components.

```javascript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const App = () => {
  return (
    <div>
      {/* Components */}
    </div>
  );
};

const MyComponent = () => {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

**Conclusion:**

The choice of state management library depends on the size and complexity of your React application, your personal preferences, and your team's experience. Each library offers unique features and benefits, so it's important to evaluate them carefully before making a decision.

