import React from 'react'
import "../../style/home/Home.scss"
import Navbar from '../../components/navbar/Navbar-screen'
import Sidebar_pannel from '../../components/sidebar/Sidebar_pannel'
import Widgets from '../widgets/Widgets'

import Analysis from '../../components/Analysis/Analysis'
const Home = () => {
  return (
    <div className='home-head'>
      <Sidebar_pannel />

      <div className="homeContainer">
        <Navbar />
        <div className="widget">
          <Widgets type="invoice"/>
          <Widgets type="sales"/>
          <Widgets type="purchase"/>
          <Widgets type="reach"/>
        </div>
        <div className="maincontainer" >
          <div className="chart-analysis" >
            <h1>Analysis</h1>
            {/* import analysis componet */}
            <Analysis />

          </div>
      
        </div>
        </div>
    </div>
  )
}
export default Home
