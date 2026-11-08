import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

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

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDashboardLayout from "./components/StudentDashboardLayout";

import TutorDashboardLayout from "./components/TutorDashboardLayout";
import TutorDashboard from "./pages/tutor/TutorDashboard";

import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentDashboardLayout from "./components/ParentDashboardLayout";

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
    <Routes>
      <Route
        path="/"
        element={
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
        }
      />

      {/* Student Dashboard with Sidebar */}
      <Route path="/student" element={<StudentDashboardLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>
      <Route path="/tutor" element={<TutorDashboardLayout />}>
        <Route path="dashboard" element={<TutorDashboard />} />
      </Route>
      <Route path="/parent" element={<ParentDashboardLayout />}>
        <Route path="dashboard" element={<ParentDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
