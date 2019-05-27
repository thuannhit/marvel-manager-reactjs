import React, {Component} from 'react';

import Ex3 from './Exer3';
import './style.css';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            sCurrentUI:'None'
        }
    }
    onClickBtn =(oEvent)=>{
        var sButton=oEvent.target.value;
        if (sButton){
            this.setState({sCurrentUI:sButton});
        };
        
    }

    render(){
        let showingUI=<Ex3/>
        return (
            <div className="d-flex flex-column App">
                {showingUI}
            </div>
        )
    }
}

export default HomePage;