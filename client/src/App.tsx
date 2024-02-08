import "./App.css";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import ReactNode from "./components/ReactNode";

function App() {
  return (
    <>
      <Header />
      <main>
        <ReactNode />
      </main>
      <Footer />
    </>
  );
}

export default App;
