import React from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'

const ResultRow = ({ label, value, thousandSeparator, prefix, suffix, size, border, type, icon, cursor }) => {
    return (
        <Wrapper className={`${size} ${type}`}>
            <Label className={cursor}>{label}{icon}</Label>

            <Value className={`${border}`}>
                <NumberFormat
                    value={value}
                    displayType={'text'}
                    thousandSeparator={thousandSeparator}
                    prefix={prefix}
                    suffix={suffix}
                />
            </Value>
        </Wrapper>
    )
}

export default ResultRow

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;

    &.calc {
        padding: 0 1rem;
    }

    &.sm {
    }

    &.lg {
        font-weight: 600;
        font-size: 1rem;
    }

    & div:nth-of-type(1) {
        justify-self: start;
      }
      
`

const Label = styled.div`
      display: grid;
      grid-auto-flow: column;
      align-items: center;

      &.pointer {
          cursor: pointer;
      }
`

const Value = styled.div`
    display: grid;
    justify-self: end;

    &.top {
        border-top: 1px solid #ccc;
        padding: 0.25rem 0;
    }
`