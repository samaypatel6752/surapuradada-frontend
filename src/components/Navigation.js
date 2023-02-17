import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import logo from '../images/logo.png'
const Navigation = () => {
  const {pathname} = useLocation()
  
  return (
    <>
    <div id="nav">
    <div id="logo">
        <img src={logo}></img>
      </div>
      <div id="tab">
        <ul>
          <li><Link className={`link ${pathname=="/info"?"act":""} ${pathname=="/"?"act":""}`} to="/">Regestration</Link></li>
          {/* <li><Link className={`link ${pathname=="/events"?"act":""}`} to="/events">Events</Link></li>
          <li><Link className={`link ${pathname=="/gallery"?"act":""}`} to="/gallery">Gallery</Link></li> */}
          <li><Link className={`link ${pathname=="/admin-panel"?"act":""}`} to="/admin-panel">Admin Panel</Link></li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navigation
