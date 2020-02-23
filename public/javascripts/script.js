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

      if (res.gameover) {
        document.body.querySelector('#points').innerText = res.points;
        window.location.href = '/gameover';
      } else {
        document.body.querySelector('#points').innerText = res[2];
        document.body.querySelector(
          '#artist1',
        ).innerHTML = `<img src="${res[0].image}" alt="${res[0].name}" class="responsive-img pulsing">`;
        document.body.querySelector(
          '#artist2',
        ).innerHTML = `<img src="${res[1].image}" alt="${res[1].name}" class="responsive-img pulsing">`;
        document.body.querySelector('#artist1name').innerText = `${res[0].name}`;
        document.body.querySelector('#artist2name').innerText = `${res[1].name}`;
      }
    }
  });
