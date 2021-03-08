import React from 'react';
//Super responsive tables
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
//Style
import './DataListing.scss'

const DataListing = ({ data, startDate, endDate, radioValue, appendLeadingZeroes }) => {

    let results = [];
    let sortedResults = [];

    // Filters data based on user input dates
    const filterData = () => {
        if (!startDate == '' && !endDate == '') {
            data.map(element => {
                let date = new Date(element.Date);
                let formattedDate = date.getFullYear() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate());
                if (formattedDate >= startDate && formattedDate <= endDate) {
                    results.push(element);
                }
            });
            return results;

        } else {
            results = data;
            return results;
        }
    }

    // Sorts data based on user checked radiobutton
    const sortData = () => {
        if (radioValue === 'date') {
            sortedResults = filterData().sort((a, b) => b.Date - a.Date);
            return sortedResults;
        }
        if (radioValue === 'volume') {
            sortedResults = filterData().sort((a, b) => b.Volume - a.Volume);
            return sortedResults;
        }
        if (radioValue === 'smaPercentage') {
            sortedResults = filterData().sort((a, b) => b['SMA5%'] - a['SMA5%']);
            return sortedResults;
        }
    }

    return (
        <Table className="table">
            <Thead>
                <Tr>
                    <Th>Date</Th>
                    <Th>Close/Date</Th>
                    <Th>Volume</Th>
                    <Th>Open</Th>
                    <Th>High</Th>
                    <Th>Low</Th>
                    <Th>Change</Th>
                    <Th>SMA5</Th>
                    <Th>SMA5 -%</Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortData().map((data, index) =>
                    <Tr key={index}>
                        {Object.entries(data).map(([key, value], index) => {
                            return <Td key={index}>{value}</Td>
                        })}
                    </Tr>
                )}
            </Tbody>
        </Table>
    );
}

export default DataListing;