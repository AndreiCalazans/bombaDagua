import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import calcPump from '../utils/pumpCalc';
import {Field , reduxForm } from 'redux-form';
import {renderField} from './renderField';


const validate = values => {
    const errors = {};


    return errors;
}


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    submit(values) {
        console.log(values);
        console.log(calcPump(Number(values.vazao) , Number(values.AS), Number(values.AR) , Number(values.L) , 'pvc' ,'water', 0.8 , Number(values.D)));
    console.log('my test ', calcPump(0.0001389 , 4 , 10 , 15 , 'pvc' ,'water' , 0.8 , 0.04));
    
    }

    render() {
    // console.log(calcPump(0.0001389 , 4 , 10 , 15 , 'pvc' ,'water' , 0.8 , 0.04));
    const {handleSubmit} = this.props;
        return (
        <div>
            <h1>Home</h1>

            <form onSubmit={handleSubmit(this.submit.bind(this))} className="form-horizontal col-sm-8 col-sm-offset-2">
                <Field name='vazao' type='number' unit='m3/s' component={renderField} label='Vazão Requerida' />
                <Field name='AS' type='number' unit='m' component={renderField} label='Altura de sucção' />
                <Field name='AR' type='number' unit='m' component={renderField} label='Altura de recalque' />
                <Field name='L' type='number' unit='m' component={renderField} label='Comprimento total' />
                <Field name='D' type='number' unit='mm' component={renderField} label='Diametro da tubulação' />
                
                
                

                <div className="form-group col-sm-offset-2 col-sm-10">
                    <button type='submit' className='btn btn-default'>Calcule</button>
                </div>
            </form>

        </div>
        )
    }
}


Home = reduxForm({
    form: 'pump',
    validate
})(connect()(Home));


export default Home;