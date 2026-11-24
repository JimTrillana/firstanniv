import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Simple Counter</h2>
      <p>You clicked {count} times</p>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
        Decrease
      </button>
    </div>
  );
}

export default Counter;