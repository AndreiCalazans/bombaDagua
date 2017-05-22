import React from 'react';
import { Route  } from 'react-router-dom';
import Home from './Home';
import Landing from './Landing';
class Main extends React.Component {


    render() {
       
        return (
                <div>
                    <div className="color-line">
                    </div>
                    <Route exact path='/' component={Landing}/>                  
                    <Route exact path='/calc' component={Home}></Route>
                
                </div>
            
        )
    }
};

export default Main;


