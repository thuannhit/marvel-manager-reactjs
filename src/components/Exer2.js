import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
class Ex2 extends Component{
    
    render(){
        return (
            <div>
                <br/>
                <Paper elevation={1}>
                    <Typography variant="h5" component="h3">
                        Using your knowledge to make the code better
                    </Typography>
                    <Typography component="p">
                        Please see the .docx file attached
                        <a href='https://1drv.ms/w/s!AsbPIUcZlBUXwEU9dfl3f0ATd9xL' target="_blank" download> Click to open</a>
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default Ex2;