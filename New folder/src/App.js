import logo from './logo.svg';
import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/views/Home';
import NavHeader from './components/layouts/NavHeader'

function App() {
  return (
  
    <>
    <NavHeader/>
    <Header/>
    <Home/>

    <Footer/>
    
    </>
  );
}

export default App;
