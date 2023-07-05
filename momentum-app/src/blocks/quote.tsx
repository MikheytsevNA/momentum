import { useState, useEffect } from "react";
import Qoutes from "./../assets/data_en.json";

export default function Quote() {
  type Quote = { quote: string; author: string };
  const [quote, setQuote] = useState<Quote | null>(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
    async function getQuote() {
      const quotes = await Qoutes.quotes;
      const randomNumber = randomNumberInRange(0, quotes.length - 1);
      setQuote({
        quote: quotes[randomNumber].quote,
        author: quotes[randomNumber].author,
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
