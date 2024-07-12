import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    const [quote, setQuote] = useState('');
    const [allQuotes, setAllQuotes] = useState([]);
    const [error, setError] = useState(false);
    const [checkQuote, setCheckQuote] = useState({});

    useEffect(() => {
        fetch('./quotes.json')
            .then((res) => res.json())
            .then((quotes) => setAllQuotes(quotes))
            .catch((err) => setError(true));
    }, []);

    useEffect(() => {
        if (allQuotes.length) {
            generateRandom();
        }
    }, [allQuotes]);

    const generateRandom = () => {
        if (allQuotes.length) {
            let randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
            while (randomQuote.id in checkQuote) {
                randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
            }

            checkQuote[randomQuote.id] = true;
            if (Object.keys(checkQuote).length === allQuotes.length) {
                setCheckQuote({});
            }
            setQuote(randomQuote);
        }
    };

    return (
        <div className="wrapper">
            {error ? (
                <div className="error-wrapper">
                    <p className="display-1">
                        Error while fetching the Quotes.
                        Please check the network connection.
                    </p>
                </div>
            ) : (
                quote && (
                    <React.Fragment>
                        <h1 className="display-1 fixed-top">
                            Here are some awesome technical quotes
                        </h1>
                        <div id="quote-box">
                            <div id="text">
                                <span className="quote-sign user-select-none">
                                    &lsquo;&lsquo;
                                </span>
                                {quote.quote}
                            </div>
                            <p id="author">- {quote.author}</p>
                            <button id="new-quote" onClick={generateRandom}>
                                Next Quote
                            </button>
                        </div>
                    </React.Fragment>
                )
            )}
        </div>
    );
};

export default App;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
