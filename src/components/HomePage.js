import React, {Component} from 'react';

import { Button, ButtonGroup } from 'reactstrap';
import Ex1 from './Exer1';
import Ex2 from './Exer2';
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
        let sCurrentUI=this.state.sCurrentUI;
        let showingUI;
        if (sCurrentUI && sCurrentUI==="Ex1"){
            showingUI=<Ex1/>
        } else if (sCurrentUI && sCurrentUI==="Ex2"){
            showingUI=<Ex2/>
        } else if (sCurrentUI && sCurrentUI ==="Ex3"){
            showingUI=<Ex3/>
        }
        return (
            <div className="d-flex flex-column App">
                <ButtonGroup size="lg">
                    <Button value="Ex1" onClick={this.onClickBtn.bind(this)}>Ex. 1</Button>
                    <Button value="Ex2" onClick={this.onClickBtn.bind(this)}>Ex. 2</Button>
                    <Button value="Ex3" onClick={this.onClickBtn.bind(this)}>Ex. 3</Button>
                </ButtonGroup>
                {showingUI}
            </div>
        )
    }
}

export default HomePage;