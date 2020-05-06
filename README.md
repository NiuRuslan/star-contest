# Star Contest ☆

Small game in which you have to guess the most popular performers according to Spotify statistics. NASA's Astronomy Picture of the Day is used for the background image, and Deezer for playing music on hover and at the end of the game. At the end of the game, information on the performer is displayed, and your result can be published on Twitter.Uses Astronomy Picture of the Day for the background, and Deezer for the music. At the end of the game the information about the artist is shown and you can tweet your result.

### Installing

after clone create .env file at the root project folder with 
```
NASAURL=**Your NASA APOD URL**
TOKEN=**Your Spotify token**
DB_URL=**YOUR MONGO DB URL**
DEEZER_KEY=**YOUR DEEZER KEY**
```

### Running

```
npm start
```
Web app will be available on http://localhost:3000/ by default
