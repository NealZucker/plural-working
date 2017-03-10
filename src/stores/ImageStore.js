import { extendObservable } from 'mobx';

export default class ImageStore {
  constructor() {
    extendObservable(this, {
      images: []
    });
    this.addNewImage = this.addNewImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

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
    .then(result => result.json())
    .then(imgag => {
      let allImages=this.images;
      allImages.push(imgag);
      this.images = allImages;
    });
  }

  setImages(images) {
    this.images = images;
  }

  deleteImage(img) {
    let allImages=this.images.slice();
    allImages=allImages.filter(i => img._id !== i._id);
    this.images = allImages;
    fetch(`/api/gifRoutes/${img._id}`, {
      method: 'DELETE'
    });
  }
}
