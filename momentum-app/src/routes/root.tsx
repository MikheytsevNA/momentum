import { useState } from "react";
import "./../index.css";
import Weather from "./../blocks/weater";

export default function Root() {
  return (
    <>
      <header className="header">
        <div className="player"></div>
        <div className="weather">{Weather()}</div>
      </header>
      <main className="main">
        <div className="time"></div>
        <div className="date"></div>
        <div className="greeting"></div>
      </main>
      <footer className="footer">
        <div className="settings"></div>
        <div className="quote"></div>
        <div className="todo"></div>
      </footer>
    </>
  );
}
