import React from 'react';
import {Link} from 'react-router-dom';

class Landing extends React.Component {
    render () {
        return (
            <div className='landing flex-center-box'>
                <p className='intro hidden-extra-small'><span className="logo_name">BombaCalc</span>,Calculadora de bomba centrifuga
                que lhe permite, calcular de forma rápida e eficiente os valores do NPSH disponível no sistema e a pressão exercidada
                por todo o sistema na bomba centrifuga.</p>
                 <p className='intro show-extra-small'><span className="logo_name">BombaCalc</span>, <br/>Calculadora de bomba centrifuga.<br/> Eficiente, Rápida e Precisa.</p>
                 <Link className='btn btn-info' to='/calc'> Começe a agora!</Link>

                <div className="footer flex-center-box">
                    <p>Desenvolvido por <a target='_blank' href="http://www.andrei-calazans.com/">Andrei Calazans</a></p>
                    <p>Faculdade Pitágoras de Linhares</p>
                </div>
            </div>
        )
    }
}

export default Landing;