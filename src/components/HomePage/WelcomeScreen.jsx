// import React from 'react';
// import WelcomeScreenPic from "../../assets/WelcomeScreenPic.jpg";

// function WelcomeScreen() {
//   return (
//     <div className="relative h-screen w-screen overflow-hidden">
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
//           <h1 className="text-white text-6xl font-extrabold tracking-wide mb-6">
//             Welcome
//           </h1>
//           <button className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-black transition-colors duration-300">
//             Shop
//           </button>
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
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-black opacity-50" // Adjust opacity as needed (0-100)
        />
        <img
          src={WelcomeScreenPic}
          alt="Welcome Screen"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text and Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-6xl font-extrabold tracking-wide mb-6">
            Welcome
          </h1>
          <Link to="/collections">
            <button className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-black transition-colors duration-300">
              Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;