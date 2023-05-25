import { Route, BrowserRouter, Routes } from "react-router-dom";
import Root from "./routes/root";
import AboutUS from "./routes/about";
import ErrorPage from "./error-page";

export default function HandleRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Root />} />
        <Route path="/about" element={<AboutUS />} />
      </Routes>
    </BrowserRouter>
  );
}
