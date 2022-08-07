import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import { BrowserRouter,Route, Routes} from "react-router-dom"
import Add from './Add';
import Detail from './Detail';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/blogs/:id" element={<Detail/>}></Route>
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
