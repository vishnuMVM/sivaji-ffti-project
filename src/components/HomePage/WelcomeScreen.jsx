// import { Link } from 'react-router-dom';
// import React from 'react';
// import WelcomeScreenPic from "../../assets/WelcomeScreenPic.jpg";

// function WelcomeScreen() {
//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Background Image with Opacity */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 bg-black opacity-50" // Adjust opacity as needed (0-100)
//         />
//         <img
//           src={WelcomeScreenPic}
//           alt="Welcome Screen"
//           className="object-cover w-full h-full"
//         />
//       </div>

//       {/* Text and Button Overlay */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-white text-6xl font-extrabold tracking-wide mb-6" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 'normal' }}>
//             Engineered for Your Edge
//           </h1>
//           <h2 className="text-white text-4xl font-semibold tracking-wide mb-6" 
//           style={{ fontFamily: 'Arizonia, cursive', fontWeight: 'normal' }}
//           >
//             FFTI Sportswear
//           </h2>
//           <Link to="/collections">
//             <button className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-black transition-colors duration-300">
//               Shop
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WelcomeScreen;

import { Link } from 'react-router-dom';
import React from 'react';
import WelcomeScreenPic from "../../assets/WelcomeScreenPic.jpg";

function WelcomeScreen() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50" />
        <img
          src="https://res.cloudinary.com/lokesh-webdev/image/upload/v1745682465/Mural%20Arts/WelcomeScreenPic_rmdwbp.jpg"
          alt="Welcome Screen"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text and Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-white text-6xl mb-6"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: "normal",
              letterSpacing: "2px",
            }}
          >
            Engineered for Your Edge
          </h1>
          <div className="flex justify-center items-center gap-4  mb-6">
          <h2
            className="text-white font-bold text-4xl mb-6"
          
          >FFTI </h2>
          <h2
            className="text-white text-4xl mb-6"
            style={{
              fontFamily: "'Pacifico'",
              fontWeight: "normal",
              letterSpacing: "1px",
            }}
          >
            Sportswear
          </h2>

          </div>
          <Link to="/collections">
            <button 
               style={{
              fontFamily: "'Pacifico'",
              fontWeight: "normal",
              letterSpacing: "1px",
            }}
            className="bg-purple-500 border border-purple-400 text-white font-semibold py-3 px-8 rounded-md hover:bg-purple-950 hover:text-slate-50 mt-2 transition-colors duration-300">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
