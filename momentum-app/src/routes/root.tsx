import { useState } from "react";
import "./../index.css";
import Weather from "../blocks/weather";
import DateLine from "../blocks/date";
import Time from "../blocks/time";
import Greeting from "../blocks/greeting";
import Slider from "../blocks/slider";
import Quote from "../blocks/quote";

export default function Root() {
  return (
    <>
      <header className="header">
        <div className="player"></div>
        <div className="weather">{Weather()}</div>
      </header>
      <main className="main">
        <div className="slider-icons">{Slider()}</div>
        <div className="time">{Time()}</div>
        <div className="date">{DateLine()}</div>
        <div className="greeting-container">{Greeting()}</div>
      </main>
      <footer className="footer">
        <div className="settings"></div>
        <div className="quote">{Quote()}</div>
        <div className="todo"></div>
      </footer>
    </>
  );
}
