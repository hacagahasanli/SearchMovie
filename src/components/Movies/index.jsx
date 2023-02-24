import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTrail, animated } from 'react-spring';
import noImage from "../../assets/images/noImage.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getNextSetMovie } from "../../redux/feature/movie-slice";
import { Card, CardMedia, Grid, CardContent, Typography } from "@mui/material"


const Movies = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(2)
  const { name } = useSelector(state => state.movie)
  const { moviesList } = useSelector((state) => state.movie)

  const trail = useTrail(moviesList?.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { mass: 1, tension: 500, friction: 35 },
    delay: 1200,
  });

  useEffect(() => {
    setPage(2)
  }, [name])

  const nextPageHandler = () => {
    dispatch(getNextSetMovie({ movieName: name, page: page }))
    setPage((prevPage) => prevPage + 1)
  }

  return <Grid sx={{ flexGrow: 1, position: "relative" }} justifyContent="center" container>
    <NextMovie onClick={nextPageHandler}>Next Page</NextMovie>
    <Grid item xs={9}>
      <Grid container justifyContent="center">
        {trail?.map((style, index) =>
          <animated.div key={`${moviesList[index].Title}+_${index}`} style={style}>
            <MovieItem key={moviesList[index].Title} movie={moviesList[index]} />
          </animated.div>
        )}
      </Grid>
    </Grid>
  </Grid>
}

const MovieItem = ({ movie }) => {

  const { imdbID, Poster, Title, Year } = movie
  const poster = Poster.substring(0, 4) === "http" ? Poster : noImage

  return <Grid key={imdbID} container item style={{ padding: "1rem" }}>
    <Card sx={{ width: "350", background: "#EBEBEB" }}>
      <Link to={`/movie/${imdbID}`}>
        <CardMedia component="img" height="350" image={poster} alt={Title} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography style={{ fontWeight: 700 }} variant="body2" color="RGB(26, 26, 26)">{Title}</Typography>
          <Typography style={{ fontWeight: 700 }} color="text.primary">{Year}</Typography>
        </CardContent>
      </Link>
    </Card>
  </Grid >
}

export default Movies

const NextMovie = styled.span`
  position: fixed;
  right: 1rem;
  z-index: 10;
  bottom: 2.2%;
  margin: auto; 
  max-width: 10rem; 
  padding: 0.46rem 1.5rem;
  border-radius: 0.4rem;
  color: white;
  border:3px dashed black;
  font-weight: 700;
  font-size:1.2rem;
  letter-spacing: 2px;
  /* background:#e8e8e8; */
  cursor:pointer;
`

// useEffect(() => {
  // fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${category}&api_key=${apiKey}&format=json`)
  //   .then(response => response.json())
  //   .then(data => {
  //     const tracks = data.tracks.track;
  //     // Do something with the tracks
  //   })
  //   .catch(error => console.error(error));
  // http://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${apiKey}&limit=${limit}&format=json
//   fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${apiKey}&limit=${limit}&format=json`)
//     .then(response => response.json())
//     .then(data => {
//       const tracks = data.results.trackmatches.track;
//       console.log(tracks, "TRACKS");
//       // Do something with the tracks
//     })
//     .catch(error => console.error(error));
// }, [])

// const apiKey = '66a6ed0c5bed492cdb27050deddffbad';
// const query = 'despacito';
// const limit = 10;\

// function handleLoadMore() {
//   // Make the API request to retrieve the next 5 tracks
//   axios.get('http://ws.audioscrobbler.com/2.0/', {
//     params: {
//       method: 'chart.gettoptracks',
//       api_key: 'YOUR_API_KEY',
//       format: 'json',
//       limit: 5,
//       page: 2
//     }
//   })
//     .then(response => {
//       const data = response.data.tracks.track;
//       setTracks(prevTracks => [...prevTracks, ...data]);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }