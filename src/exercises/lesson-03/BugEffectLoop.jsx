//src/exercises/lesson-03/BugEffectLoop.jsx

/* 
  BUG #1 — Effect Issue 

  This component uses useState and useEffect to update a value.
  The effect is running on every render, which causes the
  component to behave incorrectly.
  */

import { useEffect, useState } from 'react';

export default function BugEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1);
  }, []);

  return <p>Bug 1 Count: {count}</p>;
}

// Explanation:
// The effect was running every time the component updated so the count kept changing over and over, I fixed it by adding an empty array so it only runs one time when the component first shows up.
