import React from 'react';

const UpwardTrends = ({ startDate, endDate, data, handleEndDateChange, handleStartDateChange, appendLeadingZeroes }) => {

    let closingArray = [];
    let i = 0;

    // Loop through data, get dates between selected start and end date.
    data.forEach(elem => {
        let date = new Date(elem.Date);
        let formattedElemDate = date.getFullYear() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate());

        if (formattedElemDate >= startDate && formattedElemDate <= endDate) {

            // Set the first
            if (i === 0) {
                i = elem["Close/Last"];
            }

            // Push 1 or 0 to closingArray based on comparison
            if (elem["Close/Last"] <= i) {
                closingArray.push(1);
            } else {
                closingArray.push(0);
            }

            // After checks are done, set i value to this elements close/last
            i = elem["Close/Last"];
        }
    });

    // Get arrays streaks
    let streaks = closingArray.reduce(function (accumulator, currentValue) {
        if (currentValue) {
            accumulator[accumulator.length - 1]++;
        } else {
            accumulator.push(0);
        }
        return accumulator;
    }, [0]);

    // Use math to get only the longest streak
    let longestUpwards = Math.max(...streaks);

    return (
        <div>
            <p>In stock historical data the Close/Last price increased <b>{longestUpwards}</b> days in a row between <b>{startDate}</b> and <b>{endDate}</b>.</p>
        </div>
    );
}

export default UpwardTrends;