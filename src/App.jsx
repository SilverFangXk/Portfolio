import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound" ;
import { ProjectDetail } from "./pages/ProjectDetail";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element = {<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
