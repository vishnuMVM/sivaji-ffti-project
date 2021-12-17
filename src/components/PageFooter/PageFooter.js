import React from 'react';
import './PageFooter.css'

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
          
      <a  style={{color:"white"}} className="footer__btn" href="mailto:ffti650@gmail.com">Email Us</a>
    </address>
  </div>
  
  <ul className="footer__nav">
    <li className="nav__item">
      <h2 className="nav__title">Our Collections</h2>

      <ul className="nav__ul">
        <li>
          <a href="#">Tshirts</a>
        </li>

        <li>
          <a href="#">Track pants</a>
        </li>
            
        <li>
          <a href="#">Casuals</a>
        </li>
      </ul>
    </li>
    
    <li className="nav__item nav__item--extra">
      <h2 className="nav__title">Stores</h2>
      
      <ul className="nav__ul nav__ul--extra">
        <li>
          <a href="#">Factory</a>
        </li>
        
        <li>
          <a href="#">Retail Outlets</a>
        </li>
        
        <li>
          <a href="#">Store Location</a>
        </li>
        
        <li>
          <a href="#">Work with us</a>
        </li>
        
        {/* <li>
          <a href="#">Artificial Intelligence</a>
        </li>
        
        <li>
          <a href="#">IoT</a>
        </li> */}
      </ul>
    </li>
    
    <li className="nav__item">
      <h3 className="nav__title">Designed by</h3>
      
      <ul className="nav__ul">
        <li>
          <a href="#">yvishnuvardhan325@gmail.com</a>
        </li>
        
        <li>
          <a href="#">damalokeshskht@gmail.com</a>
        </li>
        
        {/* <li>
          <a href="#">Sitemap</a>
        </li> */}
      </ul>
    </li>
  </ul>
  
  <div className="legal">
    <p>&copy; 2019 Something. All rights reserved.</p>
    
    <div className="legal__links">
      <span>Designed by <span className="heart">♥</span> LokmaStudio</span>
    </div>
  </div>
</footer>

  )

}