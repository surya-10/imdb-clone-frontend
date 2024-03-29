import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Base from './Components/base';
import Actors from './Components/actors';
import Producers from './Components/producers';
import Home from './Components/Home';
import Movies from './Components/Movies';
import AddReview from './Components/AddReview';
import EditReview from './Components/EditReview';

function App() {

  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Base/>}/>
        <Route path='/add-review' element={<AddReview/>}/>
        <Route path='/edit-review/:id' element={<EditReview/>}/> 
      </Routes>
    </div>
  );
}

export default App;
