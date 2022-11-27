import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';

function App() {
  return (
    <div className="App">
    <Header></Header>
    <main>
     <Routes>
     <Route path="/" element={<LandingPage/>} />
     <Route path="/mynotes" element={<MyNotes/>} />
     </Routes>
    </main>
    <Footer></Footer>
    </div>
  );
}

export default App;
