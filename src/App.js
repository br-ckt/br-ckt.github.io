import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Brckt from './brckt/brckt'; // Import your main component
import Navbar from "./navbar/navbar";
import Info from "./info/info"

function App() {
  return (
      <Router>
          <Navbar />
            <Routes>
                <Route path="" element={<Brckt />} />
                <Route path="/info" element={<Info className="info-page" />} />
            </Routes>
      </Router>
  );
}

export default App;
