import Card from 'components/Card'
import Hero from 'components/Hero'
import PageWrapper from 'layouts/PageWrapper'
import React from 'react'

const Calculators = () => {

    const listOfCalcs = [
        {
            title: 'Sell The Top and Buy Back',
            description: 'Think you can time the top and buy back in? Find out how much the price would have to drop for you to end up with the same amount of bitcoin and how well you would fair under different scenarios.'
        },
        {
            title: 'Retire on Bitcoin',
            description: 'Figure out how much bitcoin you would need to retire'
        }
    ]

    listOfCalcs.map(calc => console.log(calc.title))



    return (
        <PageWrapper>
            <Hero
                title='Calculators'
                subtitle='list of calculators'
            />
            {listOfCalcs.map(calc =>
                <Card
                    title={calc.title}
                    description={calc.description}
                />
            )}
        </PageWrapper>
    )
}

export default Calculators
