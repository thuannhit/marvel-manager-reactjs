import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
        {/* <div className="text-center h1 Loading">
          Loading<span>.</span><span>.</span><span>.</span>
        </div> */}
        <CircularProgress className={classes.progress +" text-center"} color="secondary" />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
