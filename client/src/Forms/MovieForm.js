import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieForm = (props) => {
  let [movie, setMovie] = useState({title: "", director: "", metascore:"", stars:[""]});
  let [err, setErr] = useState("");
  let id = props.match.params.id;
  let status = ( id ? "Edit" : "Add" );
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
    }
  }, []);

  const addStar = (event) => {
    event.preventDefault();
    setMovie({...movie, stars: [...movie.stars,""]});
  }

  const handleChange = (event) => {
    setMovie({... movie, [event.target.name]: event.target.value});
  }

  const handleArrChange = (event, index) => {
    let newArray = [...movie.stars];
    newArray[index] = event.target.value;
    setMovie({...movie, stars: newArray});
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    let deletedEmpty = movie.stars.filter(star => star.trim() != "");
    if (id) {
      axios.put(`http://localhost:5000/api/movies/${id}`, {...movie, stars:deletedEmpty})
        .then(res => props.history.push(`/movies`))
        .catch(err => setErr("Please fill out all FIELDS"));
    } else {
      axios.post(`http://localhost:5000/api/movies`, {...movie, stars:deletedEmpty})
        .then(res => props.history.push(`/movies`));
    }
  }

  return (
    <div className="form">
      <h2>{status} Movie</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {err && <p>{err}</p>}
        <div>Title <input type="text" name="title" value={movie.title} onChange={(e) => handleChange(e)}/></div>
        <div>Director <input type="text" name="director" value={movie.director} onChange={(e) => handleChange(e)} /></div>
        <div>Metascore: <input type="text" name="metascore" value={movie.metascore} onChange={(e) => handleChange(e)} /></div>
        <div>Stars: 
          <button onClick={(e) => addStar(e)}>Add Star</button>
          {movie.stars.map((star, idx) => 
            <div key={idx}>
              <input type="text" name='stars' value={star} onChange={(e) => handleArrChange(e, idx)}/>
            </div> 
          )}
        </div>
        <button>{status} Movie</button>
      </form>
    </div>
  )
}

export default MovieForm;
