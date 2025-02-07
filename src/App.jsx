import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import { Navigation } from './components/Navigation/Navigation';
import { Gallery } from './components/Gallery/Gallery';
import { PosterDetail } from './components/PosterDetail/PosterDetail';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { SplashScreen } from './components/SplashScreen/SplashScreen';

function App() {
  return (
    <Router>
      <div className="app cursor-hover">
        <SplashScreen />
        <CustomCursor />
        <Navigation />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/poster/:id" element={<PosterDetail />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
