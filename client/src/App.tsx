import "./App.css";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import ReactNode from "./components/ReactNode";
import { Route, Routes } from "react-router-dom";
import Result from "./components/Result";
function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col grow">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<ReactNode />} />
          <Route path="/result" element={<Result />} />
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
