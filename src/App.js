import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PaymentWidget from './containers/PaymentWidget';
import success from './success';
import error from './error';


const App = () => (
    <Switch>
       <Route exact path='/' component={PaymentWidget}/>
       <Route exact path='/Sucess' component={success} />
       <Route exact path='/Error' component={error} />
    </Switch>
)

export default App;