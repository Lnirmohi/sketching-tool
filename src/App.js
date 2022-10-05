import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import Login from "./pages/login/login";

import './App.css';

function App() {

  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
