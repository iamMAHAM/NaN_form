import './App.css';
import NavBar from './NavBar';
import Home from './Home';

function App() {
  const title = "Leaning ReactJs"
  const name = "I 'll beat you bro !!!"
  return (
    <div className="App">
      <NavBar/>
      <Home />
    </div>
  );
}

export default App;
