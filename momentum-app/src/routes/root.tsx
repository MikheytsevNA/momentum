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
  return (
    <>
      <header className="header">
        <div className="search">{Search()}</div>
        <div className="weather">{Weather()}</div>
      </header>
      <main className="main">
        <div className="slider-icons">{Slider()}</div>
        <div className="time">{Time()}</div>
        <div className="date">{DateLine()}</div>
        <div className="greeting-wrapper">
          <div className="greeting-container">{Greeting()}</div>
        </div>
      </main>
      <footer className="footer">
        <div className="settings">{Settings()}</div>
        <div className="quote">{Quote()}</div>
        <div className="todo">{ToDO()}</div>
      </footer>
    </>
  );
}
