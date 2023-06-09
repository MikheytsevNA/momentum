import { useState } from "react";
import "./../index.css";
import Weather from "../blocks/weather";
import DateLine from "../blocks/date";
import Time from "../blocks/time";
import Greeting from "../blocks/greeting";
import Slider from "../blocks/slider";
import Quote from "../blocks/quote";
import Search from "../blocks/search";
import ToDO from "../blocks/todo";
import Settings from "../blocks/settings";

export default function Root() {
  const [settings, setSettings] = useState(() => {
    const storeSettings = localStorage.getItem("settings");
    if (storeSettings) {
      return JSON.parse(storeSettings);
    } else {
      return {
        time: true,
        date: true,
        greeting: true,
        quote: true,
        weather: true,
        todo: true,
        search: true,
      };
    }
  });
  function storeAndSetSettings(setting: { [key: string]: boolean }): void {
    localStorage.setItem("settings", JSON.stringify(setting));
    setSettings(setting);
  }

  const [background, setBackground] = useState(
    localStorage.getItem("backgroundImage") ?? "./src/assets/img/bg.jpg"
  );
  function storeAndSetBackground(url: string): void {
    localStorage.setItem("backgroundImage", url);
    setBackground(url);
  }
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <header className="header">
        <div className={"search" + (settings.search ? "" : " opaque")}>
          <Search></Search>
        </div>
        <div className={"weather" + (settings.weather ? "" : " opaque")}>
          <Weather></Weather>
        </div>
      </header>
      <main className="main">
        <div className="slider-icons">
          <Slider setBackground={storeAndSetBackground}></Slider>
        </div>
        <div className={"time" + (settings.time ? "" : " opaque")}>
          <Time></Time>
        </div>
        <div className={"date" + (settings.date ? "" : " opaque")}>
          <DateLine></DateLine>
        </div>
        <div
          className={"greeting-wrapper" + (settings.greeting ? "" : " opaque")}
        >
          <div className="greeting-container">
            <Greeting></Greeting>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="settings">
          <Settings
            settings={settings}
            setSettings={storeAndSetSettings}
          ></Settings>
        </div>
        <div className={"quote" + (settings.quote ? "" : " opaque")}>
          <Quote></Quote>
        </div>
        <div className={"todo" + (settings.todo ? "" : " opaque")}>
          <ToDO></ToDO>
        </div>
      </footer>
    </div>
  );
}
