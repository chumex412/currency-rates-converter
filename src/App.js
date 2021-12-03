import { useState, useEffect } from 'react';
import RatesForm from './components/RatesForm';
import RatesConversion from './components/RateConversion';
import exchangeData from './components/data';
import './App.css';

const baseURL = `https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=`;

function App() {
  const [amount, setAmount] = useState("1");
  const [options, setOptions] = useState(exchangeData);
  const [convertFrom, setConvertFrom] = useState(exchangeData[0]);
  const [convertTo, setConvertTo] = useState(exchangeData[3]);
  const [rateData, setRateData] = useState(null);
  //const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRate = async () => {
      
      setLoading(true);

      try {
        const response = await fetch(`${baseURL}${amount}&convert_id=${convertTo.id}&id=${convertFrom.id}`);
        const resData = await response.json();

        if(!resData) {
          throw new Error("Rates data cannot be fetched");
        }
        
        const {data} = resData;
        setRateData(data);
        //setPrice()
        console.log(data)
        setLoading(false)
      } catch(err) {
        console.log(err)
        setLoading(false);
        setError(err)
      }
    }

    fetchRate();

  }, [amount, convertTo, convertFrom]);

  return (
    <div className="App">
      <div className="container">
        <section className="conversion-content">
          <RatesForm 
            value={amount}
            setValue={setAmount}
          />

          <RatesConversion
            options={options}
            convertTo={convertTo}
            convertFrom={convertFrom}
            setConvertTo={setConvertTo}
            setConvertFrom={setConvertFrom}
            amount={amount}
            price={rateData?.quote[0]?.price}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
