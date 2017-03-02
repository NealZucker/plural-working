import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';

ShowGifs.propTypes = {
  gifs: React.PropTypes.array,
  addNewImage: React.PropTypes.func.isRequired,
  noButton: React.PropTypes.bool
};

export default function ShowGifs(props) {
  let images = props.gifs.map(function(img) {
    return (
      <SoloImageWithButton key={img.name} img={img} addNewImage={props.addNewImage} noButton={props.noButton}/>
    );
  });
  return (
    <div>
      {images}
    </div>
  );
}
