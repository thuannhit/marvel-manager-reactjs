import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import LoadingOverlay from 'react-loading-overlay';
import { getMarvelCharacters } from '../../../lib/MarvelService';
import DetailView from '../detailview/DetailView';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  
  componentDidMount() {
    this.getData();
  }

  onOpenDetails = (oData)=>{
    console.log("Opening detail views");
    this.setState({openDetail:true, selectedValue: oData});
  }
  onCloseDetails = (oData)=>{
    console.log("Closing detail views");
    this.setState({openDetail:false});
  }

  getData = (options) => {
    this.setState({ loading: true });
    const {
      page,
      name,
      exactMatch,
      sortName,
      limit,
    } = Object.assign({
      page: options || this.state.page,
      name: this.state.filters.name.value,
      exactMatch: this.state.filters.name.exactMatch,
      sortName: this.state.sortName,
      limit: this.state.limitPerPage,
      total: this.state.total
    }, {});
    var tmppage= (options!==null && options!== undefined) ? options : page;
    const offset = tmppage ? (tmppage) * limit : 0;

    const p = getMarvelCharacters({ offset, name, exactMatch, sortName, limit })
      .then(({ characters, maxPage, total}) => {
        this.setState({
          characters,
          // maxPage,
          page: characters.length ? tmppage : 0,
          filters: { name: { value: name, exactMatch } },
          sortName,
          limitPerPage: limit,
          rows: characters,
          maxPage: maxPage,
          total: total,
          loading: false
          
        });
        return {characters, maxPage, total}
      }).catch((error) => {});;

    return p;
  }
  constructor(props){
    super(props);
    // const { instance } = props;
    this.state = {
      loading: false,
      openDetail:false,
      selectedValue:{},
      filters: {
        name: {
          value: '',
          exactMatch: false,
        }
      },
      sortName: '',
      characters: [],
      page: 0,
      maxPage: 0,
      limitPerPage: 20,
      rows: [],
      rowsPerPage: 20,
      total: 0
    };
  };

  handleChangePage = (event, page) => {
    this.getData(page);
  };

  // handleChangeRowsPerPage = event => {
  //   // debugger;
  //   // this.setState({ page: 0, rowsPerPage: event.target.value });
  // };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, maxPage, page, total} = this.state;

    return (
      <Paper className={classes.root}>
        <LoadingOverlay
          active={this.state.loading}
          spinner
          text='Loading data...'
          >
          <div className={classes.tableWrapper}>
          {/* {this.state.loading && <Loading />} */}
          {this.state.openDetail && <DetailView  selectedValue={this.state.selectedValue}
            open={this.state.openDetail} onClose={this.onCloseDetails} />}
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name of Hero</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="right">Thumbnail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{!row.description.length ? '' :
                          row.description.length > 100 ?
                          row.description.substring(0, 100).split('').concat('...').join('') :
                          row.description}
                    </TableCell>
                    <TableCell align="right">
                      <img onClick={() => this.onOpenDetails(row)} src={row.thumbnail.path +'.'+row.thumbnail.extension} alt="Smiley face" height="42" width="42"></img>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[20]}
                    colSpan={3}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </LoadingOverlay>
      </Paper>
    );
  }
}

export default withStyles(styles)(CustomPaginationActionsTable);
