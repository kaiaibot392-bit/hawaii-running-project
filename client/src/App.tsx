import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import SchedulePage from '@/pages/SchedulePage';
import JoinPage from '@/pages/JoinPage';
import StorePage from '@/pages/StorePage';
import CoachingPage from '@/pages/CoachingPage';
import SponsorsPage from '@/pages/SponsorsPage';
import DonatePage from '@/pages/DonatePage';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/coaching" element={<CoachingPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
