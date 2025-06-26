import { Route, Routes } from "react-router";
import "./App.css";
import About from "./components/About";
import NavBar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { getAll } from "./helpers/get";
import Mechanics from "./components/Mechanics";

function App() {
  const [mechanics, setMechanics] = useState([]);
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAll();
      setMechanics(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            error ? (
              <p className="flex justify-center my-8 text-xl">{error}</p>
            ) : (
              <Mechanics mechanics={mechanics} setUpdate={setUpdate} />
            )
          }
        />
        <Route path="/register" element={<Register setUpdate={setUpdate} />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="/list/:postID" element={<DonorDetailed />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
