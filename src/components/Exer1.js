import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class Ex1 extends Component{
    RegExp=""
    constructor(props){
        super(props);
        this.state={
            result:'',
            inputString:''
        }
    }
    onClickRemoveVowels =(oEvent)=>{
        var sInputString=this.state.inputString;
        this.setState({
            result: (sInputString) ? sInputString.replace(/[aeiou]/gi, ''): ''
        })
        console.log("I am removing vowels");
    }
    handleChange=(oEvent)=>{
        this.setState({inputString:oEvent.target.value})
        console.log("It is changing somethings");
    }
    render(){
        let sResult=this.state.result;
        return (
            <div className="d-flex flex-column">
                <br/>
                <TextField id="standard-full-width" label="Input string" style={{ margin: 8 }}
                    placeholder="Your string"
                    helperText="After typing your string, please press Remove vowels button"
                    fullWidth
                    margin="normal"
                    value={this.state.inputString}
                    onChange={this.handleChange}/>
                <Button className="Button" width="50px" onClick={this.onClickRemoveVowels.bind(this)}>Remove vowels</Button>
                <p>Result: </p><p style={{fontWeight: "bold"}}>{sResult}</p>
            </div>
        )
    }
}

export default Ex1;