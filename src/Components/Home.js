import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  let navigate = useNavigate();
  let [movie, setMovie] = useState("movies")

  return (
    <div className='home-div p-4'>
      <div className='container'>
      <div className='main d-flex justify-content-around align-items-left flex-column mt-5'>
        <p className='h3 para'>Welcome !</p>
        <p className='fs-md-6 fs-5 mt-5 para'>The IMDb clone app is a versatile platform tailored for movie enthusiasts to engage with their favorite films by sharing their insights and opinions through personalized reviews. Here's a description highlighting its key features and functionalities:

          The IMDb clone app empowers users to become critics and creators within their own cinematic community. With a user-friendly interface and an extensive database of movies, users can easily navigate through a vast array of titles, from timeless classics to the latest releases.</p>
      </div>
      <div className='mt-5 d-flex justify-content-end'>
        <button className='btn bg-danger text-white me-4' onClick={()=>navigate(`/movies`)}>Get started</button>
      </div>
      </div>
    </div>
  )
}

export default Home