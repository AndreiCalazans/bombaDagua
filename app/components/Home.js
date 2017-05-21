import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import calcPump from '../utils/pumpCalc';
import {Field , reduxForm } from 'redux-form';
import {renderField} from './renderField';


const singularidades = [
    {name: 'Alargamento gradual ', Ks: 0.30},
    {name: 'Bocais ', Ks: 2.75},
    {name: 'Cotovelo 90 ', Ks: 0.90},
    {name: 'Cotovelo 45', Ks: 0.90},
    {name: 'Crivo', Ks: 0.75},
    {name: 'Curva 90', Ks: 0.40},
    {name: 'Curva 45', Ks: 0.20},
    {name: 'Entrada Normal', Ks: 0.50},
    {name: 'Entrada de Borda', Ks: 1.00},
    {name: 'Junção', Ks:0.40},
    {name: 'Redução gradual', Ks: 0.15},
    {name: 'Tê passagem direta ', Ks: 0.60},
    {name: 'Tê saída de lado', Ks:1.30},
    {name: 'Tê saída bilateral', Ks:1.80},
    {name: 'Vávula gaveta', Ks: 0.20},
    {name: 'Vávula borboleta', Ks: 0.30},
    {name: 'Vávula de retenção', Ks: 2.50},
    {name: 'Vávula globo', Ks: 10.00},
    {name: 'Vávula de pé', Ks: 1.75},
];

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
     /*renderTrTd(name , Ks){

    
    return (
        <tr>
            <td >
              <Field  name='p' type='number' min={0} component='input'/>
            </td>
            <td className='text-center'>{name}</td>
            <td>{Ks}</td>
        </tr>
    )
}*/

    render() {
    // console.log(calcPump(0.0001389 , 4 , 10 , 15 , 'pvc' ,'water' , 0.8 , 0.04));
    const {handleSubmit} = this.props;
        return (
        <div>
            <h1>Home</h1>

            <form style={{padding: "40px"}} onSubmit={handleSubmit(this.submit.bind(this))} className="form-horizontal col-sm-8 col-sm-offset-2">
                <Field name='vazao' type='number' unit='m3/s' component={renderField} label='Vazão Requerida' />
                <Field name='AS' type='number' unit='m' component={renderField} label='Altura de sucção' />
                <Field name='AR' type='number' unit='m' component={renderField} label='Altura de recalque' />
                <Field name='L' type='number' unit='m' component={renderField} label='Comprimento total' />
                <Field name='D' type='number' unit='mm' component={renderField} label='Diametro da tubulação' />
                <div>
                    <label htmlFor="" className="col-sm-12 control-label"> Peças do Conduto <i className="fa fa-chevron-down" aria-hidden="true"></i>
 </label>
                <div className="sub_box">
             
                   <table className=" table table-bordered">
                       <thead>
                           <tr>
                               <th className="col-xs-2">#</th>
                               <th className="col-xs-8 text-center">Peça</th>
                               <th className="col-xs-2 text-center">Ks</th>
                           </tr>
                       </thead>
                       <tbody>
                          {singularidades.map((e, index) => {
                              return (
                                  <tr key={index}>
                                    <td >
                                        <Field  name='p' type='number' min={0} component='input'/>
                                    </td>
                                    <td className='text-center'>{e.name}</td>
                                    <td>{e.Ks}</td>
                                 </tr>
                              )
                          })}
                           
                       </tbody>
                   </table>

                </div>

               
                </div>
                
                <div className="form-group">
                 <label className='col-sm-2 control-label'>Tipo de Fluido</label>
                 <div className="col-sm-10 input-group" style={{padding: '0 15px'}}>
                    <Field name='fluid' component='select' className='form-control input-group' >
                        <option value="water">agua</option>
                        <option value="water">Oil</option>
                    </Field>
                 </div>
                </div>
                 <div className="form-group">
                 <label className='col-sm-2 control-label'>Tipo de tubulação</label>
                 <div className="col-sm-10 input-group" style={{padding: '0 15px'}}>
                    <Field name='material' component='select' className='form-control input-group' >
                        <option value="pvc">PVC</option>
                        <option value="Metal">Metal</option>
                    </Field>
                 </div>
                </div>
                
                

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


