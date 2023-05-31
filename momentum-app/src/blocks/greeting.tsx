import { useState, useEffect, SyntheticEvent } from "react";

export default function Greeting() {
  const greetingsList = ["night", "morning", "afternoon", "evening"];
  const [greetings, setGreetings] = useState(
    changeHourToTimeOfDay(greetingsList)
  );
  const [name, setName] = useState("");

  useEffect(() => {
    setInterval(() => {
      setGreetings(changeHourToTimeOfDay(greetingsList));
    }, 5000);
  });

  function handleChange(event: SyntheticEvent): void {
    const target = event.target as HTMLInputElement;
    setName(target.value);
  }

  return (
    <>
      <div className="greeting">Good {greetings}</div>
      <input
        type="text"
        className="name"
        value={name}
        onChange={handleChange}
      />
    </>
  );
}

function changeHourToTimeOfDay(greetingsList: string[]) {
  const date1 = new Date();
  const hour = date1.getHours();
  if (hour < 6) {
    return greetingsList[0];
  } else if (hour < 12) {
    return greetingsList[1];
  } else if (hour < 18) {
    return greetingsList[2];
  } else {
    return greetingsList[3];
  }
}
