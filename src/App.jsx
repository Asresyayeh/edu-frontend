import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./pages/Home";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import Banner from "./pages/Banner";
import WhyChooseTestimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import Service from "./pages/Service";

import LoginDrawer from "./components/LoginDrawer";
import SignupDrawer from "./components/SignupDrawer";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const openLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const openSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  return (
    <>
      <Navbar onLoginClick={openLogin} />

      <Hero />
      <Categories />
      <Courses />
      <Service />
      <Banner />
      <WhyChooseTestimonials />
      <Footer />

      <LoginDrawer
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSignUpClick={openSignup}
      />

      <SignupDrawer
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onLoginClick={openLogin}
      />
    </>
  );
}

export default App;
