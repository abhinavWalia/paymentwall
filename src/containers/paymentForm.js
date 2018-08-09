import React from 'react';
import {
  Control,
  Errors,
  Form
} from 'react-redux-form';
import {connect} from 'redux';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const isluhn= value=> {
    // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;


	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

const isChar= val =>{
    var re=/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if(!re.test(val))
       return false

    return true;   
} 

const isNumber= val => !isNaN(Number(val));



class PaymentForm extends React.Component {
  constructor(props){
    super(props); 
    this.onSubmit=this.onSubmit.bind(this);
    
  }

  onSubmit(){
     this.props.history.push('/success')
  }

  render() {
    return (
      <Form model="user" onSubmit={v => this.onSubmit(v)}>
        <div className="field">
          <label>Card holder name:</label>
          <Control.text
            model=".fullname"
            placeholder="First name Last name"
            required
            validators={{ 
                isChar
            }}
            
          />
          <Errors
            className="errors"
            model=".fullname"
            show="touched"
            messages={{
              isChar:'should be characters only'
            }}
          />
        </div>
        <div className="field">
          <label>card number</label>
          <Control.text
            model=".cardnumber"
            placeholder=""
            required
            validators={{ 
               isluhn
            }}
          />
          <Errors
            className="errors"
            model=".cardnumber"
            show="touched"
            messages={{
                isluhn: 'luhn algorithm not followed'
            }}
          />
        </div>
        <div className="field">
          <label>Expiration Date</label>
         
          <Control
            model=".expiry"
            component={DatePicker}
            mapProps={{
              selected: (props) => props.modelValue,
              minDate:(props)=>props.modelValue
            }}
            // validators={{
            //   fut
            // }}

      
          />
          <Errors
            className="errors"
            model=".expiry"
            show="touched"
            messages={{
              valueMissing: 'expiry is required'
            }}
          />
        </div>
        
        <div className="field">
          <label>CVV2(CVC)</label>
          <Control
            type="password"
            model=".cvv"
            placeholder="cvv"
            required
            validators={
              {isNumber}
            }
          />
          <Errors
            className="errors"
            model=".cvv"
            show="touched"
            messages={{
              valueMissing: 'cvv is required',
              isNumber:'cvv should be a number'
            }}
          />
        </div>
        
        <button type="submit">
          Submit
        </button>
      </Form>
    );
  }
}




export default withRouter(PaymentForm);

