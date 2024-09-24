import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Attendance  from './Component/Attendence/Attendence';
function App() {
  return (
    <div className="Pages" >
    <BrowserRouter>
      <Routes>

        <Route path="/" element= {<Home />} />
        <Route path="/Attendence" element= {<Attendance />} />

      </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
