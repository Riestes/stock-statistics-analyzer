import React, { useState, useEffect } from 'react';

import dataService from './services/dataService';
import DataListing from './components/DataListing'
import UpwardsTrend from './components/UpwardsTrend';

import './App.scss';

const App = () => {

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2021-01-31');
  const [radioValue, setRadioValue] = useState('date');

  let priceChange = 0;

  // Get all all data from data service
  useEffect(() => {
    dataService
      .getAll()
      .then(initialData => {
        setData(initialData);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // Helper function add zero if month or day is missing one
  // sent as prop to DataListing and UpwardsTrend
  function appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  // Helper function to parse float
  const parseFloatHelper = (param) => {
    return parseFloat((param).replace("$", ""));
  }

  // Add Change, SMA5 value and percentage to data elements
  data.map((element, index) => {

    // Add Change values
    let high = parseFloatHelper(element.High);
    let low = parseFloatHelper(element.Low);
    priceChange = high - low;
    // Add to element
    element["Change"] = "$" + priceChange.toFixed(2).toString();

    // Add SMA5 values and percentages
    let first = index < data.length ? data[index + 1] : null;
    let second = index < data.length ? data[index + 2] : null;
    let third = index < data.length ? data[index + 3] : null;
    let fourth = index < data.length ? data[index + 4] : null;

    if (element && first && second && third && fourth) {
      // Count average
      let average =
        (
          parseFloatHelper(element['Close/Last']) +
          parseFloatHelper(first['Close/Last']) +
          parseFloatHelper(second['Close/Last']) +
          parseFloatHelper(third['Close/Last']) +
          parseFloatHelper(fourth['Close/Last'])
        ) / 5;

      // Count percentage difference
      let diff = 0;
      let diffPercentage = 0;
      diff = parseFloatHelper(element.Open) - average;
      diffPercentage = diff / parseFloatHelper(element.Open) * 100;

      // add to element
      element["SMA5"] = "$" + average.toFixed(2).toString();
      element["SMA5%"] = diffPercentage.toFixed(2);

    } else {
      element["SMA5"] = "-";
      element["SMA5%"] = "-";
    }
  })

  const handleResetClick = (event) => {
    event.preventDefault();
    setStartDate('2020-01-01');
    setEndDate('2021-01-31');
  }

  const onChangeValue = (event) => {
    setRadioValue(event.target.value)
  }

  const handleStartDateChange = (event) => {
    event.preventDefault();
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    event.preventDefault();
    setEndDate(event.target.value)
  }

  return (
    <div className="App">
      <h1>Stock Statistics</h1>
      <h3>Scrooge McDuck</h3>
      <form>
        <div className="dates">
          <p>Search Dates</p>
          <label>Start</label>
          <input type="date" value={startDate} min="2020-01-01" max="2021-01-31" onChange={handleStartDateChange}></input>
          <label>End</label>
          <input type="date" value={endDate} max="2021-01-31" onChange={handleEndDateChange}></input>
        </div>
      </form>
      <button className="reset-btn" onClick={handleResetClick}>Reset dates</button>
      <UpwardsTrend
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        startDate={startDate}
        endDate={endDate}
        data={data}
        appendLeadingZeroes={appendLeadingZeroes}
      />
      <h4>Filter listing</h4>
      by
      <div className="filters" onChange={onChangeValue}>
        <select>
          <option value="date">Date</option>
          <option value="volume">Volume</option>
          <option value="smaPercentage">SMA5 %</option>
        </select>
      </div>
      <DataListing
        radioValue={radioValue}
        startDate={startDate}
        endDate={endDate}
        data={data}
        appendLeadingZeroes={appendLeadingZeroes}
      />
    </div>
  );
}

export default App;
