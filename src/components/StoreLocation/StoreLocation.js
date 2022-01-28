
import React from "react";
import "./StoreLocation.css";
export default function StoreLocation (){

  return(
<div className="store-location-bg-container container-fluid m-auto d-flex flex-column justify-content-center p-3">
<div className="d-flex flex-column flex-md-row m-5 p-3">
        
        <div className=" p-3 w-100 m-3">
            <h2>FACTORY LOCATION</h2>
            <table >
                <tr>
                    <td><h3> Street : </h3></td>
                    <td><h3>KRISHNAPURAM 7th ROAD,<br/>
                            BESIDE MANASA SCHOOL LANE,<br/>
                            TADIPATRI,<br/>
                            ANANTAPUR DISTRICT,<br/>
                            Andhra Pradesh, 515411
                    </h3></td>
                </tr>


            </table>
        </div>

        <div className="map-container w-100 card shadow-lg">

        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1435.7703883920758!2d78.00912591239586!3d14.902463821202243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xafb5c77aaecd34be!2zMTTCsDU0JzA5LjMiTiA3OMKwMDAnMzMuNSJF!5e0!3m2!1sen!2sin!4v1640076664290!5m2!1sen!2sin" 
        className="fct-map" allowfullscreen="" loading="lazy" title="officelocation"></iframe>
        
        </div>
</div>


<div className="d-flex flex-column flex-md-row m-5 p-3">
        
        <div className="p-3 w-100 order-md-2 m-5">
        <h2>OFFICE LOCATION</h2>
            <table>
                <tr>
                    <td><h3> D.No : </h3></td>
                    <td><h3> 16-11-511/C/27</h3></td>
                </tr>

                <tr>
                    <td><h3> Street : </h3></td>
                    <td><h3>SHALIVAHANA NAGAR,<br/>
                            MOOSARAMBAGH,<br/>
                            MALAKPET,<br/>
                            HYDERABAD,<br/>
                            Telangana,500036
                    </h3></td>
                </tr>

            </table>

        </div>

        <div className="map-container w-100 card shadow-lg order-md-1">

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.817026120139!2d78.52201761479614!3d17.372535388087503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98f9da916c19%3A0x6450713303501a5c!2sFFTI%20Sports%20Wear!5e0!3m2!1sen!2sin!4v1640002286131!5m2!1sen!2sin" 
        className="fct-map" allowfullscreen="" loading="lazy" title="officelocation"></iframe>
      
        </div>
</div>
</div>
    

  )

}