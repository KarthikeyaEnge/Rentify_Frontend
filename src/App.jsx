import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Invalid from "./components/Invalid";
import Loginx from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Loginx />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="profile"
            element={
              <Profile
                userdata={JSON.parse(sessionStorage.getItem("userdata"))}
              />
            }
          />
        </Route>
        <Route path="*" element={<Invalid />} />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;
