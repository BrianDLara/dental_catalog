import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

//Components
import Nav from "../src/components/Nav";
import Footer from "../src/components/Footer";

//Pages
import Home from "../src/pages/Home";
import Procedure from "../src/pages/procedure";
import PoliticaPrivacidad from "../src/pages/PoliticaPrivacidad";
import TerminosCondiciones from "../src/pages/TerminosCondiciones";
import Callback from './pages/Callback';
import Pay from './pages/Pay';
import Success from './pages/Success';

//Auth
import { RequirePaid } from './auth/RequirePaid';

import GTMPageView from "./GTMPageView";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <div className="h-dvh bg-white">
      <header className="pt-3 xl:pt-2 xl:py-4 mb-0 xl:mb-4">
        <Nav />
      </header>

      <main className="bg-white mt-0 xl:mt-4">
        <GTMPageView />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/procedure/:id"
            element={
              <RequirePaid>
                <Procedure />
              </RequirePaid>
            }
          />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
