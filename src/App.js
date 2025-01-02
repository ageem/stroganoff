import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/navbar';
import LandingPage from './landing_page/landing_page';
import Stroganomics from './stroganomics/stroganomics';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/stroganomics" element={<Stroganomics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
