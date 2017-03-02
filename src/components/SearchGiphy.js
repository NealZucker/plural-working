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
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&limit=10&api_key=dc6zaTOxFJmzC` )
      .then(result => result.json())
      .then(data => this.setState({foundImages:this.convertToShowGifs(this.state.keyword, data.data)}));
  }

  convertToShowGifs(keyword, foundImages) {
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: keyword + " " + image.slug
    }));
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
       <ShowGifs addNewImage={this.props.addNewImage} gifs={this.state.foundImages} noButton={false}/>
    </div>
    );
  }
}
SearchGiphy.propTypes = {
  addNewImage: React.PropTypes.func.isRequired
};
export default SearchGiphy;
