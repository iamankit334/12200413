import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import RedirectPage from "./pages/RedirectPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}
