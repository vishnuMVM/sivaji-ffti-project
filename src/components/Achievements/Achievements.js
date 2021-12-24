import React from 'react';
import "./Achievements.css"
export default function Achievements (){

  return(
    <div>
      <h1 style={{textAlign:'center', color:"#9b1313"}}>Futures First Texties India</h1>
      <div className="ach-intro-text">There are two kinds of people, leaders and followers.
        The followers go along with the bandwagon, unlike the leaders who carve their own path, 
        map their own road and embark on a journey of success. Reddipalli Sivaji and Chandagani Mahendra are one among them.
        <br/>  <br/>
        These two youngsters are self-made enterprenuers, 
        who always dreamed to achieve big from their childhood.
        They started earning when they were students and they both met at hyderabad while they were working for 
        a mlm company, from then they travelled all the way to what they are now.
        <br/>  <br/>
        Having realised a fact that textile industry is the one never goes out of fashion, 
        they started FFTI on FEB 13th 2012 and stood number 1 in the market from decade.
        Their passion towards women empowerment gave opportunity for nearby womens to work and become independent.  
      </div>
      <div className='ach-table'>
        <div className='ach-tr'>
          <div className='ach-td'>
            <h2 className='table-txt'>*Media recognised FFTI services, at the time of pandamec
            </h2>
          </div>
          <div >
          <embed className='video' src="https://www.youtube.com/embed/tz171FyvwO4"></embed>
          </div>
        </div>

        <div className='ach-tr'>
          <div className='ach-td'>
            <h2 className='table-txt'>*ycp cricket cup event,hudihudihausiuuihui
            </h2>
          </div>
          <div >
          <embed className='video' src="https://www.youtube.com/embed/h1wAmA68bqI"></embed>
          </div>
        </div>
       
       </div>

    </div>

  )

}