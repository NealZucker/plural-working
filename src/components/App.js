import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import React from 'react';
import SearchGiphy from './SearchGiphy';
import { observer,inject } from 'mobx-react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.loadOurImages();
  }

  loadOurImages(){
    fetch(`api/gifRoutes` )
      .then(result => result.json())
      .then(images => this.props.imageStore.setImages(images));
  }

  render() {

    return (
      <div>
        <ShowGifs loggedinuser={this.props.route.loggedinuser}
          addNewImage={this.props.imageStore.addNewImage}
          gifs={this.props.imageStore.images} noButton deleteImage={this.props.imageStore.deleteImage}/>
      </div>
    );
  }
}

App.propTypes = {
  route: React.PropTypes.object,
  imageStore: React.PropTypes.object
};

export default inject("imageStore")(observer(App));
