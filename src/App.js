import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from './ConfigContext';
import Monitor from './Monitor';
import Config from './Config';
import './Config';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
