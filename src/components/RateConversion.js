import React from "react";
import "../styles/rates-conversion.css";

function RatesConversion ({ 
  options,
  convertTo,
  convertFrom,
  setConvertTo,
  setConvertFrom,
  amount,
  price,
  loading
}) {

  const handleSelection = ({target}, action) => {
    const value = target.value;
    //children = [...children];
    options.forEach(option => {
      //const option = options.find(option => option.id === child.dataset.id)
      if(option.name === value) {
        if(action === "convert") {
          setConvertTo(option);
        } 
        if(action === "reference") {
          setConvertFrom(option);
        }
      }
    })
  }

  console.log(parseFloat(price), parseInt(price) === 0)

  const handleSwitch = () => {
    setConvertFrom(convertTo)
    setConvertTo(convertFrom)
  } 

  const convertedRate = (loading || !price) ? <span>loading..</span> : (
    parseInt(price.toFixed(2)) === 0 ? (
      <span>{(price?.toFixed(8))}&nbsp;</span>
    ) : (
      <span>{parseFloat(price?.toFixed(2))}&nbsp;</span>
    )
  );

  return (
    <section className="rates-conversion">
      <div>
        <div className="form-group">
          <select 
            name="reference" 
            value={convertFrom.name}
            onChange={(e) => handleSelection(e, "reference")}
          >
            {
              options.map(option => {
  
                return (
                  <option value={option.name} data-id={option.id} key={option.id}>{option.name}</option>
                )
              })
            }
          </select>
        </div>
        <button onClick={handleSwitch}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M7.41 13.41 6 12l-4 4 4 4 1.41-1.41L5.83 17H21v-2H5.83zM16.59 10.59 18 12l4-4-4-4-1.41 1.41L18.17  7H3v2h15.17z"/>
          </svg>
        </button>
        <div className="form-group">
          <select 
            name="convert" 
            value={convertTo.name}
            onChange={(e) => handleSelection(e, "convert")}
          >
            {
              options.map(option => {
                return (
                  <option value={option.name} data-id={option.id} key={option.id}>{option.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <p>
        <span>{amount}{" "}{convertFrom.name}</span>&nbsp;{" "}
        <span>&nbsp;=&nbsp;</span>{" "}
        <span>{convertedRate}&nbsp;{" "}{convertTo.name}</span>
      </p>
    </section>
  )
}

export default RatesConversion;