import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Home';
import RedirectFlow from "./RedirectFlow";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/vipps/redirect" element={<RedirectFlow />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
    </Router>
    
  );
}

export default App;
