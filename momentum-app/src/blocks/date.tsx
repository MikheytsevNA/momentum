import { useState, useEffect } from "react";

export default function DateLine() {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    setInterval(() => {
      setDate(getCurrentDate());
    }, 5000);
  }, []);
  return <>{date}</>;
}

function getCurrentDate(): string {
  const date = new Date();
  const optionsDate: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return optionsDate.format(date);
}
