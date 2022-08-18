import './App.css';
import RegisterLogin from './Register';
import Login from './Login';
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={ <RegisterLogin /> }></Route>
        <Route path='/login' element={ Login }></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
