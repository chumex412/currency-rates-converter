import React from "react";
import "../styles/rates-form.css";

function RatesForm ({ value, setValue }) {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ratesInput" className="sr-only">Conversion rates</label>
        <input 
          type="number" 
          value={value} 
          name="rates" 
          id="ratesInput"
          onChange={ (e) => setValue(e.target.value) } 
        />
      </div>
    </form>
  )
}

export default RatesForm;