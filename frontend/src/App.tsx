import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import Nav2 from './components/Nav2';




const App: React.FC = () => {
  return (
    <div className="App">
        <Nav />
        {/* <Nav2 /> */}
        <Main />
        <Footer />
    </div>
  );
}

export default App;
