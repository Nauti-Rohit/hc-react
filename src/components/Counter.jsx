import { useState } from 'react'


export default function Counter() {
  const [count, setCount] = useState(0)


  const increment = () => {
    if (count < 20) {
      setCount(count + 1);
    }
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  return (
    <>

      <div>
        <h1 >Number: {count}</h1>
        <button onClick={increment}>increment</button>
        &nbsp;
        <button onClick={decrement}>decrement</button>
      </div>
      <p>Learn How to use 'useState' hook here </p>
    </>
  )
}