
import React,{Component} from 'react'; 
import {map} from 'lodash';
import config from '../../config/index';
import '../styles/paymentmethod.scss';
import { get } from 'lodash';

class PaymentMode extends Component{
    constructor(props){
        super(props);
        this.state={
            modes:[],
            countryCode:get(this.props,'countryCode')
        }
    }

    componentWillReceiveProps(props){
        const {countryCode}=this.props;
        if(props.countryCode!=countryCode){
            this.fetchmodes(props.countryCode);
        }
    }
    async fetchmodes(countryCode){
        const response = await fetch(`https://api.paymentwall.com/api/payment-systems/?key=${config.key}&${countryCode}`);
        const json = await response.json();
        this.setState({ modes: json });
    }

    componentDidMount(){
        this.fetchmodes(this.props.countryCode)
    }
    render(){
        const {modes}=this.state;
        return (
           <div className="payment-modes">
           {map(modes,mode=>{
               return(
                    <div key={mode.name} className="payment-mode">
                        <img src={mode.img_url} />
                        <span >{mode.name}</span>
                    </div>    
               )
            })
           }
           </div>
        )
    }
}


export default PaymentMode