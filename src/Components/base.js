import imdb from "../imdb-icon.png";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Base() {

    let [isHomeClicked, setIsHomeClicked] = useState(true);
    let [value, setValue] = useState("movies");
    let [actor, setActor] = useState("Actor");
    let [prod, setProd] = useState("producers");
    let [isActorClicked, setIsActorClicked] = useState(false);
    let [isProducerClicked, setIsProducerClicked] = useState(false);
    let navigate = useNavigate();

    let [moviesList, setMoviesList] = useState([]);
    let [actorsList, setActorsList] = useState([]);
    let [producersList, setProducersList] = useState([]);
    let [spinner, setSpinner] = useState(true);
    useEffect(()=>{
        getAllReview();
        getAllActors();
        getAllProducers();
    }, [])

    async function getAllReview(){
        let movies = await fetch("https://imdb-clone-backend-6ck9.onrender.com/movie/all", {
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await movies.json();
        setSpinner(false);
        setMoviesList(result.data);
    }
    async function getAllActors(){
        let actors = await fetch("https://imdb-clone-backend-6ck9.onrender.com/actor/all", {
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await actors.json();
        setSpinner(false);
        setActorsList(result.data.reverse());
    }

    async function getAllProducers(){
        let producers = await fetch("https://imdb-clone-backend-6ck9.onrender.com/producer/all", {
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await producers.json();
        setSpinner(false);
        setProducersList(result.data);
    }

   
 
    function addBorder() {
        setValue("movies");
        setIsHomeClicked(true);
        setIsActorClicked(false);
        setIsProducerClicked(false);
        printValue()
    }
    function printValue(){
        console.log(value);
    }
    function removeBorder() {
        setIsHomeClicked(false);
    }
    function addActorBorder(){
        setValue("actors");
        setIsActorClicked(true);
        setIsProducerClicked(false);
        setIsHomeClicked(false);
        printValue()
    }
    function removeActorBorder(){
        setIsActorClicked(false);
    }

    function addProducerBorder(){
        setValue("producers");
        setIsActorClicked(false);
        setIsProducerClicked(true);
        setIsHomeClicked(false);
        printValue()
    }
    function removeProducerBorder(){
        setIsProducerClicked(false);
    }

    async function deleteReview(id){
        moviesList = moviesList.filter((movie)=>movie._id!=id);
        setMoviesList([...moviesList]);

        let deleteReview = await fetch(`https://imdb-clone-backend-6ck9.onrender.com/movie/delete/${id}`, {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await deleteReview.json();
        
    }

    async function EditReview(id){
        navigate(`/edit-review/${id}`)
    }
    return (
        <div className="base-div m-3">
            <div className="container-fluid">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid cont">
                        <img src={imdb} className="imdb-img" />
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav navb">
                                <p
                                    className={`nav-link home ${isHomeClicked ? 'active' : ''}`}
                                    onClick={addBorder}
                                    onBlur={removeBorder} // This removes the border when focus is lost
                                >
                                    Movies
                                </p>
                                <p
                                    className={`nav-link actor ${isActorClicked ? 'active' : ''}`}
                                    onClick={addActorBorder}
                                    onBlur={removeActorBorder} // This removes the border when focus is lost
                                >
                                    Actors
                                </p>
                                <p
                                    className={`nav-link producer ${isProducerClicked ? 'active' : ''}`}
                                    onClick={addProducerBorder}
                                    onBlur={removeProducerBorder} // This removes the border when focus is lost
                                >
                                    Producers
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="main-div mt-4">
                    <p><span className="pe-1 fs-5">Search: </span><span className="text-uppercase h4 search-result">{value}</span></p>
                    <hr/>
                    <div className="datas">
                        {value =="actors" ? 
                        <div className="all-actors">
                            <div className="actors d-flex flex-row flex-wrap justify-content-center">
                                {actorsList.map((actor, ind)=>(
                                    <div className="actorr" key={ind}>
                                        <table className="table">
                                            <tr>
                                                <th>Name </th>
                                                <td className="p-3 act-name">{actor.Name}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender </th>
                                                <td className="p-3">{actor.Gender}</td>
                                            </tr>
                                            <tr>
                                                <th>DOB </th>
                                                <td className="p-3">{actor.DOB}</td>
                                            </tr>
                                        </table>
                                        <p className="mt-3">{actor.Bio}</p>
                                        </div>
                                ))}
                                </div>

                        </div>
                        : value=="movies" ? 
                        <div className="movies-div">
                            <button className="add-review mb-4" onClick={()=>navigate("/add-review")}>Add +</button>
                            <div className="moviess d-flex flex-column">
                                {moviesList.map((movie, ind)=>(
                                    <div>
                                    <div className="movie-review d-flex flex-column flex-lg-row" key={ind}>
                                        <div className="img-div">
                                            <img src={movie.imageData} className="movie-poster"/>
                                            </div>
                                            <div className="details d-flex justify-content-evenly flex-column">
                                                <p className="fw-bold fs-5 h4">{movie.movieName}</p>
                                                <p className="mt-3">Rating: {movie.rating}</p>
                                                <p>Released date: {movie.date}</p>
                                                <p className="">Cast and Crew</p>
                                                <div>{movie.userAddedActor.map((actor, ind)=>(
                                                    <span className="me-2 h6">{actor},</span>
                                                ))}</div>

                                                <p className="mt-3">Producer</p>
                                                <div>{movie.userAddedProd.map((prod, ind)=>(
                                                    <span className="h6 me-2">{prod},</span>
                                                ))}</div>
                                                <div className="edit-del d-flex justify-content-between mt-4">
                                                <button className="edit-btn" onClick={()=>EditReview(movie._id)}>Edit</button>
                                                <button className="delete-btn" onClick={()=>deleteReview(movie._id)}>Delete</button>
                                            </div>
                                                </div>
                                                
                                        </div>
                                        <div className="movie-plot mt-3">
                                            <p className="plot-msg">{movie.moviePlot}</p>
                                            </div>
                                            
                                        </div>
                                        
                                ))}
                                </div>
                        </div>:
                        value=="producers" ? 
                        <div className="producers-div">
                            <div className="producerr d-flex flex-row flex-wrap justify-content-center">
                                {producersList.map((producer, ind)=>(
                                    <div className="produce" key={ind}>
                                        <table className="table">
                                            <tr>
                                                <th>Name </th>
                                                <td className="p-3 act-name">{producer.Name}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender </th>
                                                <td className="p-3">{producer.Gender}</td>
                                            </tr>
                                            <tr>
                                                <th>DOB </th>
                                                <td className="p-3">{producer.DOB}</td>
                                            </tr>
                                        </table>
                                        <p className="mt-3">{producer.Bio}</p>
                                        </div>
                                ))}
                                </div>


                        </div>:""}
                    </div>
                </div>
            </div>

            {/* <ImageSlider/> */}
            {/* <MoviePosterFinder/> */}
            { spinner &&
            <div className="loader">
                <div class="spinner-grow" role="status">
                     <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow" role="status">
                     <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow" role="status">
                     <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        }
        </div>
    )
}
export default Base;