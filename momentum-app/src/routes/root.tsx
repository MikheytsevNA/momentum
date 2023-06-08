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
  const [timeItem, setTimeItem] = useState(true);
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
        <div className="search">
          <Search></Search>
        </div>
        <div className="weather">
          <Weather></Weather>
        </div>
      </header>
      <main className="main">
        <div className="slider-icons">
          <Slider setBackground={storeAndSetBackground}></Slider>
        </div>
        <div className={"time" + (timeItem ? "" : " opaque")}>{Time()}</div>
        <div className="date">
          <DateLine></DateLine>
        </div>
        <div className="greeting-wrapper">
          <div className="greeting-container">
            <Greeting></Greeting>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="settings">
          <Settings timeItem={timeItem} setTimeItem={setTimeItem}></Settings>
        </div>
        <div className="quote">
          <Quote></Quote>
        </div>
        <div className="todo">
          <ToDO></ToDO>
        </div>
      </footer>
    </div>
  );
}
