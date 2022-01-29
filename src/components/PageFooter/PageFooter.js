import React from 'react';
import './PageFooter.css'
import { Link } from 'react-router-dom';

export default function PageFooter (){

  return(

 
<footer className="footer">
  <div className="footer__addr">
    <h1 className="footer__logo">FFTI Sports</h1>
        
    <h2>Contact</h2>
    
    <address style={{color:"white"}}>
    FFTI Sports ,
    Dilsukhnagar,Hyderabad, Telangana
      <br></br>
      <br></br>
      FFTI Sports Factory,
    Tadipatri,Ananthapur Dist, Andhra Pradesh
      <a  style={{color:"white"}} className="footer__btn" href="mailto:ffti650@gmail.com">Email Us</a>
    </address>
  </div>
  
  <ul className="footer__nav">  
    <li className="nav__item nav__item--extra">
      <h2 className="nav__title">Stores</h2>
      
      <ul className="nav__ul nav__ul--extra">
        <li>
        <Link to="/grow-with-us">Grow With Us</Link>
        </li>
        
        <li>
        <Link to="/storelocation">Store Location</Link>
        </li>
        
        <li>
        <Link to="/management">Management</Link>
        </li>
        
        <li>
        <Link to="/achievements">Achievements</Link>
        </li>
      </ul>
    </li>
    
    <li className="nav__item mt-3">
     
      <h3 className="nav__title">Developer Contact</h3>
      <ul className="nav__ul">
        <li style={{textDecoration:"underline",fontStyle:"italic"}}>
          <a href="mailto:yvishnuvardhan325@gmail.com">Vishnu Vardhan</a>
        </li>
        
        <li style={{textDecoration:"underline",fontStyle:"italic"}}>
          <a href="mailto:damalokeshskht@gmail.com">Dama Lokesh</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div className="legal">
    <p>&copy; 2022. All rights reserved.</p>
    
    <div className="legal__links">
      <span>Developed by <span className="heart">😎</span> Vishnu&Lokesh</span>
    </div>
  </div>
</footer>

  )

}