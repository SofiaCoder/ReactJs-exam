import AllDancers from './pages/AllDancers'
import AddDancers from './pages/AddDancers'
import SingleDancer from './pages/SingleDancer';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.scss'

function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <nav>
    <Link to="/AllDancers">All Dancers</Link>
    <Link to="/AddDancers">Add Dancers</Link>
    </nav>

    <Routes>
      <Route path="/AllDancers" element={<AllDancers />} />
      <Route path="/AllDancers/:id" element={<SingleDancer />} />
      <Route path="/AddDancers" element={<AddDancers />} />
    </Routes>
      
      
    </BrowserRouter>
    </div>
  );
}

export default App;
