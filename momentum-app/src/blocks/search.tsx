import { useState, useEffect, SyntheticEvent } from "react";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  function handleChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    setSearchInput(target.value);
  }
  function handleEnterPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Enter") {
      window.open(
        "http://www.google.com/search?q=" + encodeURIComponent(searchInput)
      );
    }
  }
  return (
    <>
      <div className="search">
        <img
          className="search-image"
          src="/src/assets/svg/search.svg"
          alt="search icon"
        ></img>
        <input
          type="text"
          className="search-input"
          onChange={handleChange}
          onKeyDown={handleEnterPress}
        ></input>
      </div>
    </>
  );
}
