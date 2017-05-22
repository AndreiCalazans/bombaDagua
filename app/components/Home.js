import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import calcPump from '../utils/pumpCalc';
import {Field , reduxForm } from 'redux-form';
import {renderField} from './renderField';
import {Redirect } from 'react-router-dom';
import history from '../history';
import {Link} from 'react-router-dom';
const singularidades = [
    {name: 'Alargamento gradual', Ks: 0.30},
    {name: 'Bocais', Ks: 2.75},
    {name: 'Cotovelo 90', Ks: 0.90},
    {name: 'Cotovelo 45', Ks: 0.40},
    {name: 'Crivo', Ks: 0.75},
    {name: 'Curva 90', Ks: 0.40},
    {name: 'Curva 45', Ks: 0.20},
    {name: 'Entrada Normal', Ks: 0.50},
    {name: 'Entrada de Borda', Ks: 1.00},
    {name: 'Junção', Ks:0.40},
    {name: 'Redução gradual', Ks: 0.15},
    {name: 'Tê passagem direta', Ks: 0.60},
    {name: 'Tê saída de lado', Ks:1.30},
    {name: 'Tê saída bilateral', Ks:1.80},
    {name: 'Vávula gaveta', Ks: 0.20},
    {name: 'Vávula borboleta', Ks: 0.30},
    {name: 'Vávula de retenção', Ks: 2.50},
    {name: 'Vávula globo', Ks: 10.00},
    {name: 'Vávula de pé', Ks: 1.75},
];

const valueControlHl = {
    'Alargamento gradual': {
         val:0
     },
    'Bocais': {
        val:0
    },
    'Cotovelo 90':{
        val:0
    },
    'Cotovelo 45': {
        val:0
    },
    'Crivo': {
        val:0
    },
    'Curva 90':{
        val:0
    },
    'Curva 45': {
        val: 0
    },
    'Entrada Normal':{
        val:0
    },
    'Entrada de Borda': {
        val:0
    },
    'Junção': {
        val:0
    },
    'Redução gradual': {
        val:0
    },
    'Tê passagem direta': {
        val:0
    },
    'Tê saída de lado': {
        val:0
    },
    'Tê saída bilateral': {
        val:0
    },
    'Vávula gaveta': {
        val:0
    },
    'Vávula borboleta': {
        val:0
    },
    'Vávula de retenção': {
        val:0
    },
    'Vávula globo':{ 
        val:0
    },
    'Vávula de pé': {
        val:0
    }
};

const validate = values => {
    const errors = {};
     const names = ['vazao', 'AS', 'AR', 'L', 'D', 'fluid', 'material'];
    names.forEach((e) => {
        if(!values[e]) { errors[e] = 'Por favor preencha!'}
    })

    

    return errors;
}


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Hl: 0
        };
    }

    handleChangeOnHl(e) {
        valueControlHl[e.target.name].val = Number(e.target.value) * Number(e.target.dataset.ks);
        var totalValue = 0;
        for( var name in valueControlHl) {
            totalValue += valueControlHl[name].val
        }

        this.setState({
            Hl: totalValue
        })
    }



    submit(values) {
        // console.log(values);
        // console.log(this.state.Hl);
        // console.log(calcPump(Number(values.vazao) , Number(values.AS), Number(values.AR) , Number(values.L) , values.material , values.fluid , 0.8 , MMtoM(Number(values.D)) ));
        let results = calcPump(Number(values.vazao) , Number(values.AS), Number(values.AR) , Number(values.L) , values.material , values.fluid , 0.8 , MMtoM(Number(values.D)));
        this.props.setResults(results);     
    // console.log('my test ', calcPump(0.0001389 , 4 , 10 , 15 , 'pvc' ,'water' , this.state.Hl , 0.04));
        // history.push('/#results');
        this.modalToggle();
}
    modalToggle(e) {
        this.refs.modal.classList.toggle('hide');
    }
    
    render() {
    // console.log(calcPump(0.0001389 , 4 , 10 , 15 , 'pvc' ,'water' , 0.8 , 0.04));
    const {handleSubmit} = this.props;
        return (
        <div>
            <div>
                <p style={{marginTop: '20px'}}><Link className="logo_name calc_logo_name" to='/'>BombaCalc</Link></p>
            </div>
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
                               <th className="col-xs-2 text-center">Qtd</th>
                               <th className="col-xs-8 text-center">Peça</th>
                               <th className="col-xs-2 text-center">Ks</th>
                           </tr>
                       </thead>
                       <tbody>
                          {singularidades.map((e, index) => {
                              return (
                                  <tr key={index}>
                                    <td className='text-center' >
                                        
                                        <input onChange={this.handleChangeOnHl.bind(this)} data-ks={e.Ks} className='Hl' type='number' name={e.name} min={0} />
                                        {/*<Field  name={e.Ks} type='number' min={0} component='input'/>*/}
                                    </td>
                                    <td className='text-center'>{e.name}</td>
                                    <td className='text-center'>{e.Ks}</td>
                                 </tr>
                              )
                          })}
                          <tr>
                              <td colSpan='2'>
                                Total
                              </td>
                              <td>
                                  {Number(this.state.Hl).toFixed(2)}
                              </td>
                          </tr>
                           
                       </tbody>
                   </table>

                </div>

               
                </div>
                
                <div className="form-group">
                 <label className='col-sm-2 control-label'>Tipo de Fluido</label>
                 <div className="col-sm-10 input-group" style={{padding: '0 15px'}}>
                    <Field required value='water' name='fluid' component='select' className='form-control input-group' >
                        <option value=""></option>
                        <option defaultValue value="water">agua</option>
                        <option value="water">Oil</option>
                    </Field>
                 </div>
                </div>
                 <div className="form-group">
                 <label className='col-sm-2 control-label'>Tipo de tubulação</label>
                 <div className="col-sm-10 input-group" style={{padding: '0 15px'}}>
                    <Field required name='material' component='select' className='form-control input-group' >
                        <option value=""></option>                        
                        <option defaultValue value="pvc">PVC</option>
                        <option value="Metal">Metal</option>
                    </Field>
                 </div>
                </div>
                
                

                <div className="form-group col-sm-offset-2 col-sm-10">
                    <button type='submit' className='btn btn-default'>Calcule</button>
                </div>
            </form>

            <div ref='modal' className="hide results flex-center-box">
                    <div className="results_sub_box">
                        <p onClick={this.modalToggle.bind(this)} className='close_btn'><i className="fa fa-times" aria-hidden="true"></i></p>
                        <p>NPSH disponivel: <strong>{Number(this.props.results.npsh).toFixed(2)} m.c.a </strong></p>
                        <p>Pressão: <strong>{Number(this.props.results.total_pressure).toFixed(2)} m.c.a </strong></p>
                        <p>Vazão: <strong>{this.props.results.vazao} m3/s </strong></p>
                        
                    </div>
            </div>

        </div>
        )
    }
}


function MMtoM(mm) {
    return mm/1000;
}

function mapStateToProps(state) {
    return {
        results: state.results
    }
}


Home = reduxForm({
    form: 'pump',
    validate
})(connect(mapStateToProps , actions )(Home));


export default Home;


