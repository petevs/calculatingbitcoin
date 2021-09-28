import React from 'react'
import Card from 'components/Card'
import PageWrapper from 'layouts/PageWrapper'
import Hero from 'components/Hero'


const AllCalcs = () => {

    const listOfCalcs = [
        {
            title: 'Sell The Top and Buy Back',
            description: 'Think you can time the top and buy back in? Find out how much the price would have to drop for you to end up with the same amount of bitcoin and how well you would fair under different scenarios.',
            path: '/hello',
            img: 'https://images.unsplash.com/photo-1580894328141-6f3421a182a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80'
        },
        {
            title: 'Retire on Bitcoin',
            description: 'Figure out how much bitcoin you would need to retire',
            path: '/retire',
            img: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80'
        },
        {
            title: 'Dollar Cost Average',
            description: 'If you would have bought each day',
            path: '/dca',
            img: 'https://images.unsplash.com/photo-1620496866641-af6f9aef5131?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80'
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
                    key={calc.title}
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
