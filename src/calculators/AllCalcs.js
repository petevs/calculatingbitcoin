import React from 'react'
import Card from 'components/Card'
import PageWrapper from 'layouts/PageWrapper'
import Hero from 'components/Hero'


const AllCalcs = () => {

    const listOfCalcs = [
        {
            title: 'Sell The Top and Buy Back',
            description: 'Think you can time the top and buy back in? Find out how much the price would have to drop for you to end up with the same amount of bitcoin and how well you would fair under different scenarios.',
            path: 'calculators/hello'
        },
        {
            title: 'Retire on Bitcoin',
            description: 'Figure out how much bitcoin you would need to retire'
        }
    ]

    return (
        <PageWrapper>
            <Hero
                title='Calculators'
                subtitle='All Calculators'
            />
            {listOfCalcs.map(calc =>
                <Card
                    title={calc.title}
                    description={calc.description}
                    path={calc.path}
                />
            )}

        </PageWrapper>
    )
}

export default AllCalcs
