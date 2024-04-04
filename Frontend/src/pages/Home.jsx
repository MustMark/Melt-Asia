import React from 'react'
import Nav from '../components/Nav'

function Home() {
  return (
    <div className="relative">
      <Nav />
      <img src="/src/assets/home-bg.png" className="w-full h-auto" />
    </div>
  );
}

export default Home