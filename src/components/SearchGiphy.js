import React from 'react';
import ShowGifs from './ShowGifs';


class SearchGiphy extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      foundImages: []
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&limit=3&api_key=dc6zaTOxFJmzC` )
      .then(result => result.json())
      .then(data => this.setState({foundImages:this.convertToShowGifs(this.state.keyword, data.data)}));
  }

  handleDelete(img) {
    let filter = function(filterImage) {
      return filterImage.name !== img.name;
    };
    let filtered = this.state.foundImages.filter(filter);
    this.setState({foundImages: filtered });

  }
  convertToShowGifs(keyword, foundImages) {
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug
    }));
  }

  addNewImage(img) {
    fetch('/api/gifRoutes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: img.name,
        url: img.url,
        description: img.description
      })
    })
    .then(result => result.json());
    // .then(imgag => {
    //   let allImages=this.state.images.slice();
    //   allImages.push(imgag);
    //   this.setState({images: allImages});
    // });
  }

  render() {
    return (
    <div>
      <form method="" role="form">
        <legend>Search Giphy for Images</legend>

        <div className="form-group">
          <input onChange={this.handleKeywordChange} value={this.state.Keyword} type="text" className="form-control" id="keyword" placeholder="keyword"/>
        </div>

        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>

      </form>
       <ShowGifs loggedinuser={this.props.route.loggedinuser} addNewImage={this.addNewImage} handleDelete={this.handleDelete} gifs={this.state.foundImages} noButton={false}/>
    </div>
    );
  }

}
SearchGiphy.propTypes = {
  loggedinuser: React.PropTypes.object,
  route: React.PropTypes.object
  // addNewImage: React.PropTypes.func.isRequired
};
export default SearchGiphy;
