import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/achievements" element={<div>Achievements Page</div>} />
            <Route path="/grow-with-us" element={<div>Grow With Us Page</div>} />
            <Route path="/store-location" element={<div>Store Location Page</div>} />
            <Route path="/management" element={<div>Management Page</div>} />
            <Route path="/admin/add-new-collection" element={<div>Add New Collection Page</div>} />
            <Route path="/admin/manage-collections" element={<div>Manage Collections Page</div>} />
            <Route path="/admin/manage-carousel" element={<div>Manage Carousel Page</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;