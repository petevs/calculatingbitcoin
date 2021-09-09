import React from 'react'
import Hero from 'components/Hero'
import PageWrapper from './PageWrapper'

const CalculatorPage = ({ title, subtitle, children }) => {
    return (
        <PageWrapper>
            <Hero
                title={title}
                subtitle={subtitle}
            />
            {children}
        </PageWrapper>
    )
}

export default CalculatorPage
