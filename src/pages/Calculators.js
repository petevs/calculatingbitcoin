import AllCalcs from 'calculators/AllCalcs'
import DollarCostAverage from 'calculators/dca/DollarCostAverage'
import SellBuyBack from 'calculators/sellbuyback/SellBuyBack'
import React, {useEffect } from 'react'
import { auth } from 'firebase'
import {
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'
import BuyTheDip from 'calculators/buythedip/BuyTheDip'

const Calculators = () => {

    let match = useRouteMatch()

    // useEffect(() => {
    //     auth.signInAnonymously()
    //       .then(() => {
    //         //Signed in
    //       })
    //       .catch(err => {console.log(err.message)})
    //   })
    

    return (
        <Switch>
            <Route path={`${match.path}/hello`}>
                <SellBuyBack />
            </Route>
            <Route path={`${match.path}/dca`}>
                <DollarCostAverage />
            </Route>
            <Route path={`${match.path}/buy-the-dip`}>
                <BuyTheDip />
            </Route>
            <Route path={match.path}>
                <AllCalcs />
            </Route>
        </Switch>
    )
}

export default Calculators
