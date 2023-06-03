import { useState, useEffect } from "react";

export default function Quote() {
  type Quote = { quote: ""; author: "" };
  const [quote, setQuote] = useState<Quote | null>(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
    async function fetchQuote() {
      const url = "/src/assets/data_en.json";
      const response = await fetch(url);
      const result = await response.json();
      return result;
    }
    async function getQuote() {
      const quotes = await fetchQuote();
      const randomNumber = randomNumberInRange(0, quotes.quotes.length - 1);
      setQuote({
        quote: quotes.quotes[randomNumber].quote,
        author: quotes.quotes[randomNumber].author,
      });
    }
    getQuote();
  }, [change]);

  function randomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function clickHandler() {
    setChange(!change);
  }
  return (
    <>
      <button onClick={clickHandler} className="change-quote"></button>
      <div>
        <div className="quote">{'"' + quote?.quote + '"'}</div>
        <div className="author">{quote?.author}</div>
      </div>
    </>
  );
}
