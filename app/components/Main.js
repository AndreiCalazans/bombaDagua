import React from 'react';
import { Route  } from 'react-router-dom';
import Home from './Home';

class Main extends React.Component {


    render() {
       
        return (
                <div>
                  
                    <Route exact path='/' component={Home}></Route>
                
                </div>
            
        )
    }
};

export default Main;


