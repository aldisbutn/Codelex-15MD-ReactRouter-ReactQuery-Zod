import { Routes, Route } from 'react-router-dom';


import './App.css';

import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { DisplayCards } from './components/DisplayCards/DisplayCards';
import { DisplayAndEditCard } from './components/DisplayAndEditCard/DisplayAndEditCard';
import { Create } from './components/Create/Create';
import { About } from './components/About/About';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/drivers' element={<DisplayCards />} />
        <Route path='/drivers/:id' element={<DisplayAndEditCard />} />
        <Route path='/create' element={<Create />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
};

export default App;
