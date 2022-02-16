import "./Management.css";

const Management = () => {
  return (
    <div className="management-main-container">
      <div className="owner-container">
        <div className="mng-img-container">sivaji bro pic comes here</div>
        <div className="mng-owner-info">
          <h2>Contact info</h2>
          <div className="para-icons-container">
            <p className="para">
              Reddipalli Sivaji
              <br />
              One of the founder and CEO of FFTI sports wear and also for HCS
              SOLUTIONS company in USA,California. He completed his
              B.Tech(Mechanical Engineering) from Osmania university, Hyderabad,
              Telangana.
            </p>
            <div className="mng-pg-icon-container">
              <div className="individual-icon-container">
                <p className="individual-icon">
                  <i class="fa fa-at" aria-hidden="true"></i>
                </p>
                <p>ffti650@gmail.com</p>
              </div>

              <div className="individual-icon-container">
                <p className="individual-icon">
                  <i class="fa fa-phone individual-icon" aria-hidden="true"></i>
                </p>
                {/* <p>9666614474, 7032014474</p> */}
                {/* <a href="https://wa.me/9666614474"><p>9666614474</p></a>
                                <span className="m-3"></span> */}
                <a href="tel:+917032014474">
                  <p>7032014474</p>
                </a>
              </div>
              <div className="individual-icon-container">
                <p className="individual-icon">
                  <i class="fab fa-whatsapp mr-2"></i>
                </p>
                <a href="whatsapp://send?&phone=+919666614474">
                  <p>9666614474</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="owner-container">
        <div className="mng-img-container-m">mahendra bro pic comes here</div>
        <div className="mng-owner-info-m">
          <h2>Contact info</h2>
          <div className="para-icons-container">
            <p className="para">
              Chandagani Mahendra
              <br />
              One of the founder and CEO of FFTI sports wear and also for HCS
              SOLUTIONS company in USA,California. He earned a master's level
              degree(MCA) as his highest academic level.
            </p>
            <div className="mng-pg-icon-container">
              <div className="individual-icon-container">
                <p className="individual-icon">
                  <i class="fa fa-at" aria-hidden="true"></i>
                </p>
                <p>mahendrababu699@gmail.com</p>
              </div>

              <div className="individual-icon-container">
                <p className="individual-icon">
                  <i class="fab fa-whatsapp mr-3"></i>
                </p>
                <a
                  // href="https://web.whatsapp.com/send?phone=9666614474"
                  href="whatsapp://send?&phone=+919966499915"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>9966499915</p>
                </a>
                {/* <p>9966499915</p> */}
              </div>
              <div className="individual-icon-container">
                <p className="individual-icon">
                  <i
                    class="fa fa-whatsapp individual-icon"
                    aria-hidden="true"
                  ></i>
                </p>
                {/* <a href="https://wa.me/9666614474"><p>9966499915</p></a> */}
                {/* <p>9966499915</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
