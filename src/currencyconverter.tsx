import React, { useState, useEffect } from 'react';
import './currencyconverter.css'
// Define types for the API response
type Rates = {
  [key: string]: number;
};

type CurrencyApiResponse = {
  base: string;
  time_last_update_utc: string
  rates: Rates;
};

type CurrencyComparison = {
  baseCurrency: string;
  targetCurrency: string;
  amount: number;
};
type CurrencyComponentProps = {
  darkTheme: boolean;
  toggleTheme: () => void;
};
const CurrencyConverter: React.FC<CurrencyComponentProps> = ({ darkTheme, toggleTheme }) => {
  // State to manage the theme
  // const [darkTheme, setDarkTheme] = useState(false);

  // // Function to toggle the theme
  // const toggleTheme = () => {
  //   setDarkTheme(prevTheme => !prevTheme);
  // };

  // useEffect(() => {
  //   if (darkTheme) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkTheme]);

  const [currencyData, setCurrencyData] = useState<CurrencyApiResponse | null>(null);
  const [comparisons, setComparisons] = useState<CurrencyComparison[]>([
    { baseCurrency: 'USD', targetCurrency: 'EUR', amount: 1 },
  ]);

  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

  const fetchCurrencyData = async (baseCurrency: string) => {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: CurrencyApiResponse = await response.json();
      setCurrencyData(data);
      setAvailableCurrencies(Object.keys(data.rates));
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  useEffect(() => {
    fetchCurrencyData('USD');
  }, []);

  const addComparison = () => {
    const newComparison: CurrencyComparison = { baseCurrency: 'USD', targetCurrency: 'EUR', amount: 1 };
    setComparisons([...comparisons, newComparison]);
  };

  const handleBaseCurrencyChange = (index: number, newBaseCurrency: string) => {
    const newComparisons = [...comparisons];
    newComparisons[index].baseCurrency = newBaseCurrency;
    setComparisons(newComparisons);
    fetchCurrencyData(newBaseCurrency);
  };

  const handleTargetCurrencyChange = (index: number, newTargetCurrency: string) => {
    const newComparisons = [...comparisons];
    newComparisons[index].targetCurrency = newTargetCurrency;
    setComparisons(newComparisons);
  };

  const handleAmountChange = (index: number, newAmount: number) => {
    const newComparisons = [...comparisons];
    newComparisons[index].amount = newAmount;
    setComparisons(newComparisons);
  };

  if (!currencyData || availableCurrencies.length === 0) return <div>Loading...</div>;

  return (
    <div className={darkTheme ? 'dark' : ''}>
      {/* <nav>
        <button onClick={toggleTheme}>
          {darkTheme ? 'Light' : 'Dark'} Mode
        </button>
      </nav> */}
      <div>
        {comparisons.map((comparison, index) => {
          const exchangeRate = currencyData.rates[comparison.targetCurrency] || 0;
          const convertedAmount = comparison.amount * exchangeRate;

          return (
            // <div key={index}>
            //   <input
            //     type="number"
            //     value={comparison.amount}
            //     onChange={(e) => handleAmountChange(index, parseFloat(e.target.value))}
            //   />
            //   <select
            //     value={comparison.baseCurrency}
            //     onChange={(e) => handleBaseCurrencyChange(index, e.target.value)}
            //   >
            //     {availableCurrencies.map((currencyCode) => (
            //       <option key={currencyCode} value={currencyCode}>
            //         {currencyCode}
            //       </option>
            //     ))}
            //   </select>
            //   <select
            //     value={comparison.targetCurrency}
            //     onChange={(e) => handleTargetCurrencyChange(index, e.target.value)}
            //   >
            //     {availableCurrencies.map((currencyCode) => (
            //       <option key={currencyCode} value={currencyCode}>
            //         {currencyCode}
            //       </option>
            //     ))}
            //   </select>
            //   <strong>{comparison.baseCurrency}</strong> is <span>{convertedAmount.toFixed(2)}</span> <strong>{comparison.targetCurrency}</strong>
            // </div>
            <div className={`currency-converter ${darkTheme ? 'currency-converter-dark' : ''}`}>
  {comparisons.map((comparison, index) => {
    const exchangeRate = currencyData.rates[comparison.targetCurrency] || 0;
    const convertedAmount = (comparison.amount * exchangeRate).toFixed(2);

    return (
      <div key={index} className="currency-comparison">
        <div className="currency-inputs">
          <input
            type="number"
            value={comparison.amount}
            onChange={(e) => handleAmountChange(index, parseFloat(e.target.value))}
            className="amount-input"
          />
          <input
            type="text"
            value={convertedAmount}
            className="converted-amount"
            readOnly
          />
        </div>
        <div className="currency-selectors">
          <select
            value={comparison.baseCurrency}
            onChange={(e) => handleBaseCurrencyChange(index, e.target.value)}
            className="currency-select"
          >
            {availableCurrencies.map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
          </select>
          <button className="switch-button" onClick={() => { /* logic to switch currencies */ }}>⇅</button>
          <select
            value={comparison.targetCurrency}
            onChange={(e) => handleTargetCurrencyChange(index, e.target.value)}
            className="currency-select"
          >
            {availableCurrencies.map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
          </select>
        </div>
        <div className="last-updated">
          Last Updated UTC: <time>{currencyData.time_last_update_utc}</time>
        </div>
      </div>
    );
  })}
  <button className="add-comparison-button" onClick={addComparison}>+</button>
</div>
          );
        })}
        {/* <button onClick={addComparison}>Add New Comparison</button> */}
      </div>
    </div>
  );
};

export default CurrencyConverter;
