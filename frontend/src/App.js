import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/CreateNote/SIngleNote';
import LandingPage from './screens/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import MyNotes from './screens/MyNotes/MyNotes';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

function App() {

  const [search,setSearch]= useState("")
  console.log('search:', search)
  return (
    <div className="App">
    <Header setSearch={setSearch}></Header>
    <main>
     <Routes>
     <Route path="/" element={<LandingPage/>} />
     <Route path="/login" element={<LoginScreen/>} />
     <Route path="/register" element={<RegisterScreen/>} />
     <Route path="/createnote" element={<CreateNote/>} />
     <Route path="/note/:userId" element={<SingleNote />} />


     <Route path="/mynotes" element={<MyNotes search={search}/>} />
     </Routes>
    </main>
    <Footer></Footer>
    </div>
  );
}

export default App;
