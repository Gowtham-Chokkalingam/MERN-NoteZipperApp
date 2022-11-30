import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import MyNotes from './screens/MyNotes/MyNotes';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

function App() {
  return (
    <div className="App">
    <Header></Header>
    <main>
     <Routes>
     <Route path="/" element={<LandingPage/>} />
     <Route path="/login" element={<LoginScreen/>} />
     <Route path="/register" element={<RegisterScreen/>} />

     <Route path="/mynotes" element={<MyNotes/>} />
     </Routes>
    </main>
    <Footer></Footer>
    </div>
  );
}

export default App;
