import React, { useEffect, useState } from 'react'
import imdb from "../imdb-icon.png";
import { useNavigate } from 'react-router-dom';

function AddReview() {
    let [moviesList, setMoviesList] = useState([]);
    let [actorsList, setActorsList] = useState([]);
    let [producersList, setProducersList] = useState([]);
    let [showProducerList, setShowProducerList] = useState(false);
    let [showActorsList, setShowActorsList] = useState(false);
    let [inputValue, setInputValue] = useState('');
    let [addActor, setAddActor] = useState("");
    let [userAddedProd, setUserAddedProd] = useState([]);
    let [userAddedActor, setUserAddedActor] = useState([]);
    let [movieName, setMovieName] = useState("");
    let [date, setDate] = useState("");
    let [moviePoster, setMoviePoster] = useState();
    let [moviePlot, setMoviePlot] = useState("");
    let [imageData, setImageData] = useState(null);
    let [error, setError] = useState("");
    let [showError, setShowError] = useState(false);
    let [imageSize, setImageSize] = useState(0);
    let [addReview, setAddReview] = useState("Create-review");
    let [disable, setDisable] = useState(false);
    let navigate = useNavigate();
    let [rating, setRating] = useState("");
    useEffect(() => {
        // getAllReview();
        getAllActors();
        getAllProducers();
    }, [])


    async function getAllActors() {
        let actors = await fetch("https://imdb-clone-backend-6ck9.onrender.com/actor/all", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let result = await actors.json();
        setActorsList(result.data.reverse());
    }
    async function getAllProducers() {
        let producers = await fetch("https://imdb-clone-backend-6ck9.onrender.com/producer/all", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let result = await producers.json();
        setProducersList(result.data);
    }

    function handleRating(e){
        setRating(e.target.value);
    }
    const handleProducerClick = (producer) => {
        setInputValue(producer);
        setShowProducerList(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setShowProducerList(true);
        
    };

    const handleActorchange = (event)=>{
        setAddActor(event.target.value);
        setShowActorsList(true);
    }

    function handleActorClick(actor){
        setAddActor(actor);
        setShowActorsList(false);
    }

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.producer-list') && event.target.id !== 'producerInput') {
            setShowProducerList(false);
        }
    };

    const handleActorOutsideClick = (event) => {
        if (!event.target.closest('.actors-list') && event.target.id !== 'actorsInput') {
            setShowActorsList(false);
        }
    };

    function addProducer(){
        
        setUserAddedProd([...userAddedProd, inputValue]);
        setShowProducerList(false);
        setInputValue("");
    }

    function addActors(){
        setUserAddedActor([...userAddedActor, addActor]);
        setShowActorsList(false);
        setAddActor("");
    }

    function deleteActor(id){
        userAddedActor = userAddedActor.filter((actor, ind)=>ind!==id);
        setUserAddedActor(userAddedActor);
    }

    function deleteProd(id){
        userAddedProd = userAddedProd.filter((prod, ind)=>ind!==id);
        setUserAddedProd([...userAddedProd]);
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(imageSize<=2){
        setDisable(true);
        setAddReview("Adding....")
        
        let obj = {
            movieName,
            date,
            userAddedActor, 
            userAddedProd,
            moviePlot,
            imageData,
            rating
        }
        let result = await fetch("https://imdb-clone-backend-6ck9.onrender.com/movie/add-review", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        setDisable(false);
        setAddReview("create-review")
        navigate("/movies");
    }
    else{
        setError("Image size should be less than 2MB");
        setShowError(true);
    }
        
    }

    function handleMovieChange(e){
        setMovieName(e.target.value);
    }

    function handlePoster(e){
        setShowError(false);
        let selectedFile = e.target.files[0];
        let size = selectedFile.size / (1024 * 1024);
        setImageSize(size);
        let reader = new FileReader();
        reader.onloadend = () => {
        setImageData(reader.result);
        }
        reader.readAsDataURL(selectedFile);
        
    }   

    function handlePlot(e){
        setMoviePlot(e.target.value);
    }

    function handleDate(e){
        setDate(e.target.value);
    }

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('click', handleActorOutsideClick);
    return (
        <div className='add-review-div'>
            <div className='review container mt-3 mb-4'>
                
                <div className='d-flex flex-column'>
                    <div className='form mt-4'>
                        <p className='name text-center text-uppercase fs-5 fw-bold underline text-danger'>Add movie review here</p>
                        <form onSubmit={handleSubmit}>
                        <img src={imdb} className="imdb-img-icon ms-4" />
                            <div className='form-inside d-flex flex-column ms-4 justify-content-center align-items-start'>
                                <div>
                                    <label>Movie name</label>
                                    <br />
                                    <input type='text' placeholder='movie name' 
                                    value={movieName}
                                    onChange={handleMovieChange}
                                    required/>
                                </div>
                                <div>
                                    <label>Rating</label>
                                    <br/>
                                    <input type='text' placeholder='Rate movie'
                                    value={rating}
                                    onChange={handleRating}
                                    required/>
                                </div>
                                <div>
                                    <label>Release date</label>
                                    <br />
                                    <input type='date' 
                                    value={date}
                                    onChange={handleDate}
                                    required/>
                                </div>
                                <div className="">
                                    <label>Poster</label><br />
                                    {showError &&<p className='text-danger'>{error}</p>}
                                    <input type="file" placeholder='select movie poster'
                                    // value={moviePoster}
                                    onChange={handlePoster}
                                    required/>
                                </div>
                                <div className='parent-lists'>
                                    <label>Producers</label><br />
                                    <div>
                                        {userAddedProd.length>0? (userAddedProd.map((prod, key)=>(
                                            <p key={key} className='p-1 list-para'>{prod}<span className='delete' onClick={()=>deleteProd(key)}>X</span></p>
                                        ))):""}
                                    </div>
                                    <div className='parent-lists'>
                                    <input
                                        type="text"
                                        id="producerInput"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        
                                    />
                                    <span className='plus' onClick={addProducer}>+</span>
                                    <div className='lists'>
                                    {showProducerList && (
                                        <div className="producer-list">
                                            {producersList.map((producer, index) => (
                                                <div key={index} onClick={() => handleProducerClick(producer.Name)}>
                                                    {producer.Name}
                                                </div>
                                            ))}
                                            </div>
                                        
                                    )}
                                    </div>
                                    </div>

                                </div>
                                <div className='parent-lists'>
                                    <label>Actors</label><br />
                                    <div>
                                        {userAddedActor.length>0? (userAddedActor.map((actor, key)=>(
                                            <p key={key} className='p-1 list-para'>{actor}<span className='delete' onClick={()=>deleteActor(key)}>X</span></p>
                                        ))):""}
                                    </div>
                                    <div className='parent-lists'>
                                    <input
                                        type="text"
                                        id="actorsInput"
                                        value={addActor}
                                        onChange={handleActorchange}
                                        autoComplete="off"
                                        
                                    />
                                    <span className='plus' onClick={addActors}>+</span>
                                    <div className='lists'>
                                    {showActorsList && (
                                        <div className="actors-list">
                                            {actorsList.map((actor, index) => (
                                                <div key={index} onClick={() => handleActorClick(actor.Name)}>
                                                    {actor.Name}
                                                </div>
                                            ))}
                                            </div>
                                        
                                    )}
                                    </div>
                                    </div>

                                </div>
                                <div className='bio'>
                                    <label>Plot</label>
                                    <br/>
                                    <textarea
                                    placeholder='movie plot'
                                    value={moviePlot}
                                    onChange={handlePlot}
                                    required
                                    ></textarea>
                                </div>
                                <div>
                                    <button className='submit'
                                    disabled={disable}
                                    >{addReview}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddReview