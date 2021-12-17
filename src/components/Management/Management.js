import "./Management.css";


const Management=()=>{
    return(
       <div className="management-main-container">
           <div className="owner-container">
               <div>
                    sivaji bro pic comes here
               </div>
               <div>
                   <h2>Contact info</h2>
                   <p>biref intro of sivaji</p>
                   <div className="mng-pg-icon-container">
                        <i class="fa fa-at" aria-hidden="true"></i>
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <i class="fa fa-whatsapp" aria-hidden="true"></i>
                   </div>
               </div>
               
           </div>


           <div className="owner-container">
               <div>
                    mahendra bro pic comes here
               </div>
               <div>
                   <h2>Contact info</h2>
                   <p>biref intro of mahendra</p>
                   <div className="mng-pg-icon-container">
                        <i class="fa fa-at" aria-hidden="true"></i>
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <i class="fa fa-whatsapp" aria-hidden="true"></i>
                   </div>
               </div>
           </div>
       </div> 
    )
}

export default Management;