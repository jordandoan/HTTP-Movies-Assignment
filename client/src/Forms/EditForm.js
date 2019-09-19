import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditForm = (props) => {
  let [movie, setMovie] = useState({title: "", director: "", metascore:"", stars:[]});
  let id = props.match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => setMovie(res.data))
  }, []);

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
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(props.history.push(`/movies/${id}`));
  }
  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>Title <input type="text" name="title" value={movie.title} onChange={(e) => handleChange(e)}/></div>
        <div>Director <input type="text" name="director" value={movie.director} onChange={(e) => handleChange(e)} /></div>
        <div>Metascore: <input type="text" name="metascore" value={movie.metascore} onChange={(e) => handleChange(e)} /></div>
        <div>Stars: {movie.stars.map((star, idx) => 
          <div key={idx}>
            <input type="text" name='stars[{idx}]' value={star} onChange={(e) => handleArrChange(e, idx)}/>
          </div> 
        )}
        </div>
        <button>Edit Movie</button>
      </form>
    </div>
  )
}

export default EditForm;
