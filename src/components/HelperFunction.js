const Helper = {

  addNewImage: function(img) {
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
  }
};

export default Helper;
