import React from 'react'
import Menu from '../Components/Menu/Menu'
import Hero from '../Components/Hero/Hero'
import Display from '../Components/display/Display'

const Home = ({category,setCategory}) => {
  return (
    <div className='home'>
      <Hero/>
      <Menu category={category} setCategory={setCategory}/>
      <Display category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home
