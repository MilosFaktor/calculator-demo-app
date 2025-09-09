import "./css/App.css";
import NavBar from "./components/NavBar";
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Calculator from "./pages/Calculator";
import AuthPanel from './pages/AuthPanel';

function App() {
  return (
    <div>
      <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Calculator" element={<Calculator />}/>
        <Route path="/auth" element={<AuthPanel />} />
      </Routes>
    </main>
    </div>
  );
}

export default App;
