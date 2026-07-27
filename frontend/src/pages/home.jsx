import React from 'react';
import Header from '../components/Header';
import About from './about'
import MapComponent from './MapComponent';
import Contact from './contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div id = 'home'>
      <Header/>
      <About/>
      <MapComponent />
      <Contact/>
    </div>
  );
};

export default Home;
