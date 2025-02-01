import logo from './recipe.jpg';
import './App.css';

//Todo: make GET request to node server to retrieve first page of recipes
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gotch Family Recipes</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Coming Soon
        </p>
      </header>
    </div>
  );
}

export default App;
