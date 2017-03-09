import React from 'react';

class SoloImageWithButton extends React.Component{

  constructor() {
    super();
    this.addOurImage = this.addOurImage.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
  }

  addOurImage(){
    this.props.addNewImage(this.props.img);
    this.props.handleDelete(this.props.img);
  }

  handleDeleteImage(){
    this.props.deleteImage(this.props.img);
  }

  render() {
    let ourButton = (
      <button onClick={this.addOurImage} type="submit" className="btn btn-primary"> Add To My list </button>
    );
    let deleteButton = (
      <button onClick={this.handleDeleteImage} type="submit" className="btn btn-primary"> Delete </button>
    );
    return(
      <div key={this.props.img.name}> <br/>
        <img src={this.props.img.url}></img>
        {(this.props.noButton && !this.props.loggedinuser.isloggedin) ? '' : ourButton}
        {(!this.props.noButton && this.props.loggedinuser.isadmin) ? '' : deleteButton}
        <h3>{this.props.img.description}</h3>
      </div>
    );
  }
}

SoloImageWithButton.propTypes = {
  img: React.PropTypes.object,
  addNewImage: React.PropTypes.func,
  noButton: React.PropTypes.bool,
  handleDelete: React.PropTypes.func,
  deleteImage: React.PropTypes.func,
  loggedinuser: React.PropTypes.object
};

export default SoloImageWithButton;
