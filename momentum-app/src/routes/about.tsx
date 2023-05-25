import { useState } from "react";
import reactLogo from "./../assets/react.svg";
import viteLogo from "/vite.svg";

export default function Root() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <p className="read-the-docs">About</p>
      </div>
    </>
  );
}
