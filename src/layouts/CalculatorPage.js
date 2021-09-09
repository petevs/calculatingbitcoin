import React from 'react'
import Hero from 'components/Hero'
import PageWrapper from './PageWrapper'

const CalculatorPage = ({ title, subtitle }) => {
    return (
        <PageWrapper>
            <Hero
                title={title}
                subtitle={subtitle}
            />
            <p>hi</p>
        </PageWrapper>
    )
}

export default CalculatorPage
