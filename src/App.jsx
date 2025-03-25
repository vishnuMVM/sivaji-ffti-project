import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';

function App() {  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/achievements" element={<div>Achievements Page</div>} />
        <Route path="/grow-with-us" element={<div>Grow With Us Page</div>} />
        <Route path="/store-location" element={<div>Store Location Page</div>} />
        <Route path="/management" element={<div>Management Page</div>} />
        <Route path="/admin/add-new-collection" element={<div>Add New Collection Page</div>} />
        <Route path="/admin/manage-collections" element={<div>Manage Collections Page</div>} />
        <Route path="/admin/manage-carousel" element={<div>Manage Carousel Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
