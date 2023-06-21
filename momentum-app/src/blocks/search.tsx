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
      <label className="search-image" htmlFor="search-input"></label>
      <input
        type="text"
        id="search-input"
        className="search-input"
        onChange={handleChange}
        onKeyDown={handleEnterPress}
      ></input>
    </>
  );
}
