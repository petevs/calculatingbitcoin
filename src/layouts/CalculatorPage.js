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
        </PageWrapper>
    )
}

export default CalculatorPage
