import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';

ShowGifs.propTypes = {
  gifs: React.PropTypes.array,
  addNewImage: React.PropTypes.func.isRequired,
  noButton: React.PropTypes.bool,
  handleDelete: React.PropTypes.func,
  deleteImage: React.PropTypes.func,
  loggedinuser: React.PropTypes.object
};

export default function ShowGifs(props) {
  let images = props.gifs.map(function(img) {
    return (
      <SoloImageWithButton loggedinuser={props.loggedinuser} key={img.name} img={img} addNewImage={props.addNewImage}
      handleDelete={props.handleDelete} deleteImage={props.deleteImage} noButton={props.noButton}/>
    );
  });
  return (
    <div>
      {images}
    </div>
  );
}
