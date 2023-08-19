import { useEffect, useRef, useState } from "react";
import "./App.css";
import Block from "./components/Block";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);
  // const [rates, setRates] = useState({});
  const ratesRef = useRef({});

  const baseApi =
    "https://api.currencylayer.com/live?access_key=NvVnxX22Fty9N8WJ2A1lAUfrcjOtRTws";

  useEffect(() => {
    fetch(baseApi)
      .then((res) => res.json())
      .then((json) => {
        // setRates(json(rates));
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.log(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef[fromCurrency];
    const res = price * ratesRef[fromCurrency];
    setToPrice(res.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const res = (ratesRef[fromCurrency] / ratesRef[toCurrency]) * value;
    setFromPrice(res.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
