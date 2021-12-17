import "./Footer.css";

const Footer=()=>{
    return(
        <div>
            <div className="footer-main-contianer">
            <div className="footer-row-container">
                <div className="footer-each-container">
                    <div className="footer-image-container">
                        {/* <img src={amma} alt="ma_in_lotous" className="ma-img"/> */}
                        <div>
                            <h3>FFTI Sports</h3>
                            <h4>Dilsukhnagar,Hyderabad, Telangana</h4>
                        </div>
                    </div>
                </div>

                <div className="footer-each-container">
                    <h3>Email</h3>
                    <h4>ffti650@gmail.com</h4>
                </div>

                <div className="footer-each-container">
                    <h3>Phone</h3>
                    <h4>9848022338</h4>
                </div>
            </div>
            </div>

            <div className="footer-main-dev-contianer">
            <div className="footer-dev-container">
                <div className="footer-each-container">
                    <h5>@ fftisports</h5>    
                </div>

                <div className="footer-dev-details-container">
                    <div>
                          <h4>Contact Details</h4>
                    </div>
                  
                    <div>
                        <h5>damalokeshskht@gmail.com</h5>
                        <h5>yvishnuvardhan325@gmail.com</h5>
                    </div>
                </div>

                <div className="footer-each-container">
                    <h5>Designed & Developed by LokmaStudio</h5>
                </div>
            </div>
            </div>


        </div>
    )
}



export default Footer;