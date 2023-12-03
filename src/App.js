import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import CharacterPage from './pages/CharacterPage/CharacterPage';
// Optional: import LocationPage from './pages/LocationPage';
// Optional: import EpisodePage from './pages/EpisodePage';

const App = () => {
  return (
   
      <Router>
       <div>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/character/:id" element={<CharacterPage />} />
           {/* Optional: <Route path="/locations" component={LocationPage} /> */}
           {/* Optional: <Route path="/episodes" component={EpisodePage} /> */}
           {/* Add more routes as needed */}
         </Routes>
       </div>
     </Router>
  );
};

export default App;
