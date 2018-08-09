
import React,{Component} from 'react'; 
import CountrySelector from 'react-geoidentify-country-selector';
import PaymentMode from '../containers/paymentMethod';
import {get} from 'lodash';
import PaymentForm from '../containers/paymentForm';

class PaymentWidget extends Component{

    constructor(props){
        super(props);
        this.state={
            countryCode:'IN',
            amount:''
        }
    }


    render(){       
        return(
        <div className="payment-widget"> 
                <div className="country-section">
                    <div className="header-text">{`You are currently in ${this.state.countryCode} . To change select from below`}</div>
                    <label>{'Select Country'}</label>
                    <CountrySelector
                        defaultCountry="India"
                        getSelectedCountry={coutryObject => 
                            this.setState({countryCode:get(coutryObject,'ISOALPHA2Code','IN')
                        }) }
                    />
                </div>   
                 <div className="p-amount">
                        <label>{'Enter Amount'}</label>
                        <input className="amount "type="text" 
                            placeholder={'Enter Amount'} 
                            value={this.state.amount}
                            onChange={ e => this.setState({ amount:e.target.value })}
                        />   
                      
                </div>   
              
                <div className="p-methods">
                    <div className="header-text">{'Choose Your Payment Method'}</div>
                    <PaymentMode
                        {...this.state}
                    />
                </div>
                <div className="p-form">
                    <PaymentForm
                    />
                </div>
          
        </div>
        )
    }
}

export default PaymentWidget



