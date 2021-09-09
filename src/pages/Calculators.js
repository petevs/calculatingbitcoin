import AllCalcs from 'calculators/AllCalcs'
import SellBuyBack from 'calculators/SellBuyBack'
import Hero from 'components/Hero'
import PageWrapper from 'layouts/PageWrapper'
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'

const Calculators = () => {

    let match = useRouteMatch()

    return (
        <Router>
            <PageWrapper>
                <Hero
                    title='Calculators'
                    subtitle='list of calculators'
                />
                <Switch>
                    <Route exact path={`${match.path}/`}>
                        <AllCalcs />
                    </Route>
                    <Route path={`${match.path}/hello`}>
                        <SellBuyBack />
                    </Route>
                </Switch>
            </PageWrapper>
        </Router>
    )
}

export default Calculators
