document.body
  .querySelector('.artists')
  .addEventListener('click', async (event) => {
    if (event.target.title) {
      const req = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: event.target.title }),
      });
      const res = await req.json();
      const points = document.getElementById('points');

      if (res.gameover) {
        points.innerText = res.points;
        window.location.href = '/gameover';
      } else {
        points.innerText = res[2];

        const artist1 = document.getElementById('artist1');
        const artist2 = document.getElementById('artist2');

        artist1.title = `${res[0].name}`;
        artist1.style = `background-image: url(${res[0].image});`;
        artist1.innerHTML = `<audio id="artist1_audio">
          <source src="${res[0].preview}" />
        </audio>`;

        artist2.title = `${res[1].name}`;
        artist2.style = `background-image: url(${res[1].image});`;
        artist2.innerHTML = `<audio id="artist2_audio">
          <source src="${res[1].preview}" />
        </audio>`;

        document.getElementById('artist1name').innerText = `${res[0].name}`;
        document.getElementById('artist2name').innerText = `${res[1].name}`;
      }
    }
  });

function playAudio(id) {
  const music = document.getElementById(`${id}_audio`);
  music.volume = 0.5;
  music.play();
}

function pauseAudio(id) {
  document.getElementById(`${id}_audio`).pause();
}

document.getElementById('artist1').addEventListener('mouseenter', (event) => {
  playAudio(event.target.id);
});

document.getElementById('artist2').addEventListener('mouseenter', (event) => {
  playAudio(event.target.id);
});

document.getElementById('artist1').addEventListener('mouseleave', (event) => {
  pauseAudio(event.target.id);
});

document.getElementById('artist2').addEventListener('mouseleave', (event) => {
  pauseAudio(event.target.id);
});

document.getElementById('popstar').addEventListener('mouseleave', (event) => {
  playAudio(event.target.id);
});

document.getElementById('popstar').addEventListener('mouseenter', (event) => {
  pauseAudio(event.target.id);
});
