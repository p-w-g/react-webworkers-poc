import { useState, useEffect } from "react";
import "./App.css";

const key = import.meta.env.VITE_QUOTES_KEY;
const url = import.meta.env.VITE_QUOTES_URL;

const quoteWorker = new Worker("./src/workers/quoteWorker.js");

export const App = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    quoteWorker.onmessage = (event) => {
      const { quote, author, category, error } = event.data[0];
      error
        ? setQuote(
            `Unfortunately some errors do happen from time to time: ${error}`
          )
        : setQuote(`${quote} By ${author} on ${category}. `);
    };
  }, []);
  return (
    <>
      <h1>Webworker thread POC</h1>
      <div className="card">
        <button onClick={() => quoteWorker.postMessage({ url, key })}>
          Fetch quote
        </button>
        <p>{quote}</p>
      </div>
      <p className="read-the-docs">
        Click on the button to send a request to Api Ninjas quote api and get a
        random quote (of the day perhaps?)
      </p>
    </>
  );
};
