import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import calcPump from '../utils/pumpCalc';
import {Field , reduxForm } from 'redux-form';
import {renderField} from './renderField';
import {Redirect } from 'react-router-dom';
import history from '../history';
import {Link} from 'react-router-dom';
import {singularidades , valueControlHl } from '../utils/perdasLocais';


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
        let results = calcPump(
            Number(removeCommaForDot(values.vazao)), 
            Number(removeCommaForDot(values.AS)),
            Number(removeCommaForDot(values.AR)), 
            Number(removeCommaForDot(values.L)),
            Number(removeCommaForDot(values.Visc)/1000),
            Number(removeCommaForDot(values.Patm)),
            Number(removeCommaForDot(values.Pv)),
            Number(removeCommaForDot(values.Densidade)),
            values.material, 
            this.state.Hl, 
            MMtoM(Number(removeCommaForDot(values.D)))
            );
        this.props.setResults(results);     
        this.modalToggle('result');
}
    modalToggle( which) {
        let name = 'modal_'+which;

        this.refs[name].classList.toggle('hide');
    }
    
    render() {
    const {handleSubmit} = this.props;
        return (
        <div>
            <div>
                <p style={{marginTop: '20px'}}><Link className="logo_name calc_logo_name" to='/'>BombaCalc</Link></p>
            </div>
            <form style={{padding: "40px"}} onSubmit={handleSubmit(this.submit.bind(this))} className="form-horizontal col-sm-8 col-sm-offset-2">
                <Field name='vazao' type='number'  unit='m3/s' component={renderField} label='Vazão Requerida' />
                <Field name='AS' type='number' unit='m' component={renderField} label='Altura de sucção' />
                <Field name='AR' type='number' unit='m' component={renderField} label='Altura de recalque' />
                <Field name='L' type='number'  unit='m' component={renderField} label='Comprimento total' />
                <Field name='D'  type='number' unit='mm' component={renderField} label='Diametro da tubulação' />
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
                

                <Field name='Visc'  type='number' unit='cP (centpoise)' component={renderField} label='Viscosidade dinâmica do Fluido' />
                <p className='link' onClick={() => { this.modalToggle('tabela_visc')}}>Tabela de viscosidade</p>
                <Field name='Patm'  type='number' unit='Pa' component={renderField} label='Pressão barométrica (Pressão atmosférica)' />
                <p className='link' onClick={() => { this.modalToggle('tabela_barometrica')}}>Tabela de pressões atmosféricas</p>
               
                <Field name='Pv'  type='number' unit='Pa' component={renderField} label='Pressão de Vapor do fluido' />
                <p className='link' onClick={() => { this.modalToggle('tabela_vapor')}}>Tabela de pressão de vapor</p>
             
                <Field name='Densidade'  type='number' unit='kg/m3' component={renderField} label='Densidade do fluido' />
                <p className='link' onClick={() => { this.modalToggle('tabela_densidade')}}>Tabela de pressão de vapor</p>
                  



                 <div className="form-group">
                 <label className='col-sm-2 control-label'>Tipo de tubulação</label>
                 <div className="col-sm-10 input-group" style={{padding: '0 15px'}}>
                    <Field required name='material' component='select' className='form-control input-group' >
                        <option value=""></option>                        
                        <option defaultValue value="pvc">PVC</option>
                        <option value="ferro fundido">Ferro fundido</option>
                        <option value="ferro galvanizado">Ferro galvanizado</option>
                        <option value="ferro fundido asfaltado">Ferro fundido asfaltado</option>
                        <option value="aço comercial">Aço comercial</option>
                        <option value="concreto">Concreto</option>
                        <option value="madeira">Madeira</option>
                    </Field>
                 </div>
                </div>
                
                

                <div className="form-group col-sm-offset-2 col-sm-10">
                    <button type='submit' className='btn btn-default'>Calcule</button>
                </div>
            </form>

            <div ref='modal_result' className="hide results flex-center-box">
                    <div className="results_sub_box">
                        <p onClick={() => { this.modalToggle('result')}} className='close_btn'><i className="fa fa-times" aria-hidden="true"></i></p>
                        <p>NPSH disponivel: <strong>{Number(this.props.results.npsh).toFixed(2)} m.c.a </strong></p>
                        <p>Pressão: <strong>{Number(this.props.results.total_pressure).toFixed(2)} m.c.a </strong></p>
                        <p>Vazão: <strong>{this.props.results.vazao} m3/s </strong></p>
                        
                    </div>
            </div>

            <div ref='modal_tabela_visc' className="hide results flex-center-box">
                    <div className="results_sub_box">
                        <p onClick={() => { this.modalToggle('tabela_visc')}} className='close_btn'><i className="fa fa-times" aria-hidden="true"></i></p>
                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <td className="col-xs-6">Liquido (a 20C)</td>
                                  <td className="col-xs-6">Viscosidade dinâmica (cP)</td>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>água</td>
                                  <td>1</td>
                              </tr>
                
                          </tbody>
                      </table>
                    </div>
            </div>

            <div ref='modal_tabela_vapor' className="hide results flex-center-box">
                    <div className="results_sub_box">
                        <p onClick={() => { this.modalToggle('tabela_vapor')}} className='close_btn'><i className="fa fa-times" aria-hidden="true"></i></p>
                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <td className="col-xs-6">temperatura(C)</td>
                                  <td className="col-xs-6">Pressão de vapor Pa</td>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>10</td>
                                  <td>1600</td>
                              </tr>
                              <tr>
                                  <td>20</td>
                                  <td>2300</td>
                              </tr>
                              <tr>
                                  <td>30</td>
                                  <td>4200</td>
                              </tr>
                              <tr>
                                  <td>50</td>
                                  <td>12300</td>
                              </tr>
                
                          </tbody>
                      </table>
                    </div>
            </div>
             <div ref='modal_tabela_densidade' className="hide results flex-center-box">
                    <div className="results_sub_box">
                        <p onClick={() => { this.modalToggle('tabela_densidade')}} className='close_btn'><i className="fa fa-times" aria-hidden="true"></i></p>
                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <td className="col-xs-6">Líquido</td>
                                  <td className="col-xs-6">Kg/m3</td>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Óleo</td>
                                  <td>790</td>
                              </tr>
                              <tr>
                                  <td>Água</td>
                                  <td>1000</td>
                              </tr>
                              <tr>
                                  <td>Gasolina</td>
                                  <td>680</td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
            </div>
             <div ref='modal_tabela_barometrica' className="hide results flex-center-box">
                    <div className="results_sub_box">
                        <p onClick={() => { this.modalToggle('tabela_barometrica')}} className='close_btn'><i className="fa fa-times" aria-hidden="true"></i></p>
                      <table className="table table-bordered">
                          <thead>
                              <tr>
                                  <td className="col-xs-6">Altitude(Km)</td>
                                  <td className="col-xs-6">Pa</td>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>0</td>
                                  <td>103375</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>81600</td>
                              </tr>
                              <tr>
                                  <td>2</td>
                                  <td>65280</td>
                              </tr>
                              <tr>
                                  <td>4</td>
                                  <td>40800</td>
                              </tr>
                              <tr>
                                  <td>6</td>
                                  <td>23120</td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
            </div>

        </div>
        )
    }
}


function MMtoM(mm) {
    return mm/1000;
}
function removeCommaForDot(str) {
    if( /,/.test(str)) { 
        return str.replace(/,/ , '.')
    } else { return str}
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


