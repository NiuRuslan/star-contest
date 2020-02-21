const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=mKFduuIgKpeVqZWZXXwRUAj9jS5TpGjIaV4oK5u8';

fetch(apiUrl)
  .then((data) => {
    if (data.ok) {
      return data.json();
    }
    throw new Error('Response not ok.');
  })
  .then((POD) => generateHtml(POD))
  .catch((error) => console.error('Error:', error));


const generateHtml = (data) => {
  console.log(data);
  // document.body.style = `background: url(${data.hdurl}) #fff no-repeat cover`;
  document.body.style = `background-image: url(${data.hdurl})`;
};

url = '';

fetch('https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF?q=year:2000&type=artist', { headers: { Authorization: 'Bearer BQBT5z57Dq-lH5MZy1S8u1AqaZ9000sa-sIechvh9zFcxTasn3nDbjOUPiSn0uf8VO-N9uL-78rXWPccmpt4eLoOdLmHSMs2emnVUNuUZQi1n1xE34K9y2Ky5yZrVnuH-_XzXB3o1z4DRyfFttoEfK1xQy1qzQZiV0BvGcqE0XMP-jB5qEAPz81gjki4DDdgSRVgfA6ndovy8iPEl7i0-I-Gf-sNhdgO2ceTQHnbkPoJBO7K8Q' } })
  .then((data) => {
    if (data) {
      console.log(data)
      return data.json();
    }
    throw new Error('Response not ok.');
  })
  .then((POD) => console.log(POD))
  .catch((error) => console.error('Error:', error));
