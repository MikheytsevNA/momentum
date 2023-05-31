import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
  }, []);
  return <>{time}</>;
}

function getCurrentTime(): string {
  const date1 = new Date();
  const optionsTime: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
  return optionsTime.format(date1);
}
