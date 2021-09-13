import AllCalcs from 'calculators/AllCalcs'
import DollarCostAverage from 'calculators/dca/DollarCostAverage'
import SellBuyBack from 'calculators/sellbuyback/SellBuyBack'
import React from 'react'
import {
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'

const Calculators = () => {

    let match = useRouteMatch()

    return (
        <Switch>
            <Route path={`${match.path}/hello`}>
                <SellBuyBack />
            </Route>
            <Route path={`${match.path}/dca`}>
                <DollarCostAverage />
            </Route>
            <Route path={match.path}>
                <AllCalcs />
            </Route>
        </Switch>
    )
}

export default Calculators
