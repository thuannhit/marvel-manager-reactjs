
import React from 'react';
import './style.css';
import { Modal } from 'react-bootstrap';
import { getMarvelComics } from '../../../lib/MarvelService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Loading from '../loading/LoadingIcon';

export default class DetailView extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  componentDidMount() {
    this.getData();
  }

  getData = (options) => {
    const { selectedValue } = this.props;
    this.setState({ loading: true });
    var characterId = selectedValue.id;
    const p = getMarvelComics({ characterId })
      .then(({ comics }) => {
        console.log(comics)
        this.setState({
          comics,
          loading: false
        });
        return comics;
      })
      .catch((error) => { });
    return p;
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comics: []
    }
  };

  render() {
    const { open, onClose, selectedValue, ...other } = this.props;
    const { classes } = this.props;
    const comics = this.state ? this.state.comics : [];
    return (
      <Modal show={open} onHide={onClose} dialogClassName="Character-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedValue.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedValue.thumbnail.path + '.' + selectedValue.thumbnail.extension} alt={this.name} className="Character-modal-img img-circle " />
          <div className="Character-modal-desc">
            <h4>Description</h4>
            <p>{selectedValue.description}</p>
            {this.detail &&
              <a target="_blank" className="btn-link btn-block"
                href={this.detail.url} rel="noopener noreferrer">
                Read more on Marvel Official Page</a>
            }
            {this.wiki &&
              <a target="_blank" className="btn-link btn-block"
                href={this.wiki.url} rel="noopener noreferrer">
                Read more on Marvel Universe Wiki</a>
            }
            {this.comicLink &&
              <a target="_blank" className="btn-link btn-block"
                href={this.comicLink.url} rel="noopener noreferrer">
                Read Comic Public Info</a>
            }
          </div>
          {/* <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'>
                </LoadingOverlay> */}
          {this.state.loading && <Loading />}
          <List>
            {comics.map(comic => (
              <ListItem alignItems="flex-start" key={comic.id}>
                <ListItemAvatar>
                  <Avatar alt="Thuan Nguyen" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} />
                </ListItemAvatar>
                <ListItemText
                  primary={comic.title}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" color="textPrimary">
                        Discription
                                </Typography>
                      {comic.description}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}

          </List>
        </Modal.Body>
      </Modal>
    );
  }
}

