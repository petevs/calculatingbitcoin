import React from 'react'
import Card from 'components/Card'
import PageWrapper from 'layouts/PageWrapper'
import Hero from 'components/Hero'


const AllCalcs = () => {

    const listOfCalcs = [
        {
            title: 'Sell The Top and Buy Back',
            description: 'Think you can time the top and buy back in? Find out how much the price would have to drop for you to end up with the same amount of bitcoin and how well you would fair under different scenarios.',
            path: 'calculators/hello',
            img: 'https://images.unsplash.com/photo-1580894328141-6f3421a182a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80'
        },
        {
            title: 'Retire on Bitcoin',
            description: 'Figure out how much bitcoin you would need to retire',
            path: 'calculators/retire',
            img: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80'
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
                    img={calc.img}
                />
            )}

        </PageWrapper>
    )
}

export default AllCalcs
