import React, { useState } from 'react'
import ResultRow from 'layouts/ResultRow'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styled from 'styled-components'


const SBBResults = ({ results, details }) => {

    const [calcVisibility, setCalcVisibility] = useState(false)

    const toggleVisibility = () => {
        setCalcVisibility(!calcVisibility)
    }

    function nWC(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const MyIcon = () => {
        return (
            <>
                {
                    calcVisibility ?
                        <KeyboardArrowUpIcon onClick={toggleVisibility} />
                        : <KeyboardArrowDownIcon onClick={toggleVisibility} />
                }
            </>
        )
    }

    return (
        <>
            <ResultRow
                label='Sale Proceeds'
                value={results.proceeds}
                thousandSeparator={true}
                prefix={'$'}
                suffix={''}
                size=''
                border=''
            />
            <ResultRow
                label='Less: Tax'
                value={results.taxes}
                thousandSeparator={true}
                prefix={'$'}
                suffix={''}
                size='sm'
                icon={<MyIcon />}
                cursor='pointer'
            />
            {
                calcVisibility &&

                <DetailedCalc>
                    <ResultRow
                        label={`Sale Proceeds (${details.bitcoin} x ${nWC(details.currentPrice)})`}
                        value={results.proceeds}
                        thousandSeparator={true}
                        prefix={'$'}
                        suffix={''}
                        size='sm'
                        type='calc'
                    />
                    <ResultRow
                        label={`Less: Cost (${details.bitcoin} x ${nWC(details.averageCost)})`}
                        value={results.cost}
                        thousandSeparator={true}
                        prefix={'$'}
                        suffix={''}
                        size='sm'
                        type='calc'
                    />
                    <ResultRow
                        label='Total Gain'
                        value={nWC(results.profit)}
                        thousandSeparator={true}
                        prefix={'$'}
                        suffix={''}
                        size='sm'
                        type='calc'
                        border='top'
                    />
                    <ResultRow
                        label={`Taxable Gain (${nWC(results.profit)} x ${results.gainRate}%)`}
                        value={results.taxableGain}
                        thousandSeparator={true}
                        prefix={'$'}
                        suffix={''}
                        size='sm'
                        type='calc'
                    />
                    <ResultRow
                        label={`Taxes Owed (${nWC(results.taxableGain)} x ${details.taxRate}%)`}
                        value={results.taxes}
                        thousandSeparator={true}
                        prefix={'$'}
                        suffix={''}
                        size='sm'
                        type='calc'
                        border='top'
                    />
                </DetailedCalc>
            }
            <ResultRow
                label='Available Cash'
                value={results.leftoverCash}
                thousandSeparator={true}
                prefix={'$'}
                suffix={''}
                size='lg'
                border='top'
            />
            <ResultRow
                label='Amount Spent'
                value={details.amountSpent}
                thousandSeparator={true}
                prefix={'$'}
                suffix={''}
                size=''
            />
            <ResultRow
                label='Buyback Price'
                value={details.buyBackPrice}
                thousandSeparator={true}
                prefix={'$'}
                suffix={''}
                size=''
            />
            <ResultRow
                label='Bitcoin Purchased'
                value={results.newBitcoin}
                thousandSeparator={false}
                prefix={''}
                suffix={''}
                size='lg'
                border='top'
            />
            <ResultRow
                label='Net Bitcoin'
                value={results.netBitcoin}
                thousandSeparator={false}
                prefix={''}
                suffix={''}
                size=''
                border=''
            />
            <ResultRow
                label='Remaining Cash'
                value={results.netCash}
                thousandSeparator={true}
                prefix={'$'}
                suffix={''}
                size=''
                border=''
            />

        </>
    )
}

export default SBBResults

const DetailedCalc = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: .25rem;
    background-color: #F5F5F5;
    padding: 1rem 0;
    border: 1px dashed #ccc;
`