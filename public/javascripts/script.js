// fetch(apiUrl)
//   .then((data) => {
//     if (data.ok) {
//       return data.json();
//     }
//     throw new Error('Response not ok.');
//   })
//   .then((POD) => generateHtml(POD))
//   .catch((error) => console.error('Error:', error));

// const generateHtml = (data) => {
//   console.log(data);
//   // document.body.style = `background: url(${data.hdurl}) #fff no-repeat cover`;
//   document.body.style = `background-image: url(${data.hdurl})`;
// };

document.body
  .querySelector('.artists')
  .addEventListener('click', async (event) => {
    if (event.target.alt) {
      const req = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: event.target.alt }),
      });
      const res = await req.json();

      console.log(res.points);

      if (res.gameover) {
        document.body.querySelector('#points').innerText = res.points;
        window.location.href = '/gameover';
      } else {
        document.body.querySelector('#points').innerText = res[2];
        document.body.querySelector(
          '#artist1',
        ).innerHTML = `<img src="${res[0].images[1].url}" alt="${res[0].name}" class="responsive-img pulsing">`;
        document.body.querySelector(
          '#artist2',
        ).innerHTML = `<img src="${res[1].images[1].url}" alt="${res[1].name}" class="responsive-img pulsing">`;
        document.body.querySelector('#artist1name').innerText = `${res[0].name}`;
        document.body.querySelector('#artist2name').innerText = `${res[1].name}`;
      }
    }
  });

// fetch('https://api.spotify.com/v1/search?q=year:2019&type=artist', { headers: { Authorization: 'Bearer BQC3uchBhu-lgGy_pdkW48FoGPDKh244F20RUQH9DEfW9aYWYgApqSHNoZQTOjJS3NPsjDPS10WqoYjwc2CpnqUCu1aX7zSf7mpfE6U4dk2RJXbwWqdksX78taLtgPCkOv-EcOmUDIH7pEecua9bZLGchc_y2RX8QpFKnSd4QlVjE8xhTgntFZHse-bUJXv7bCcxJtChWoTpt1_S3jEqlb_SrRo-deoUcBVzDvlh7xB8IggXiQ' } })
//   .then((data) => {
//     if (data) {
//       return data.json();
//     }
//     throw new Error('Response not ok.');
//   })
//   .then((POD) => console.log(POD.artists.items))
//   .catch((error) => console.error('Error:', error));
