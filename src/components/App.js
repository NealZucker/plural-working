import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import React from 'react';
import SearchGiphy from './SearchGiphy';


const testGifs = [
  {
    name: "cat",
    description: "grumpy cat",
    url: "https://media.giphy.com/media/gSotjAQJmPTJm/giphy.gif"
  }
];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      images: testGifs
    };
    this.addNewImage = this.addNewImage.bind(this);
  }

  addNewImage(img) {
    testGifs.push(img);
    this.setState({images: testGifs});
  }

  render() {
    return (
      <div>
        <SearchGiphy addNewImage={this.addNewImage}/>
        <SearchGifs addNewImage={this.addNewImage}/>
        <ShowGifs addNewImage={this.addNewImage} gifs={this.state.images} noButton/>

      </div>
    );
  }
}

export default App;
