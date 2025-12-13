import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [view, setView] = useState("home"); // home | cart | login | register
  const [token, setToken] = useState(false);

  const renderView = () => {
    switch (view) {
      case "login":
        return <LoginPage />;
      case "register":
        return <RegisterPage />;
      case "cart":
        return <Cart />;
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
