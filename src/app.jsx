import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [view, setView] = useState("home"); // home | login | register
  const [token, setToken] = useState(false); // más adelante lo usarás para auth real

  // Función para renderizar la vista actual
  const renderView = () => {
    switch (view) {
      case "login":
        return <LoginPage />;
      case "register":
        return <RegisterPage />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Navbar setView={setView} token={token} />

      <main className="container my-4">
        {renderView()}
      </main>

      <Footer />
    </>
  );
};

export default App;
