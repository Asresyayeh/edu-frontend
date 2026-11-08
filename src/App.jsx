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
import StudentCourses from "./pages/student/StudentCources";
import StudentSchedule from "./pages/student/StudentSchedule";
import StudentMessages from "./pages/student/StudentMessages";
import StudentProgress from "./pages/student/StudentProgress";
import StudentPayments from "./pages/student/StudentPayments";
import StudentSettings from "./pages/student/StudentSettings";
import TutorCourses from "./pages/tutor/TutorCourses";
import TutorStudents from "./pages/tutor/TutorStudents";
import TutorSchedule from "./pages/tutor/TutorSchedule";
import TutorAssignments from "./pages/tutor/TutorAssignments";
import TutorMessages from "./pages/tutor/TutorMessages";
import TutorEarnings from "./pages/tutor/TutorEarnings";
import TutorSettings from "./pages/tutor/TutorSettings";
import ParentChildren from "./pages/parent/ParentChildren";
import ParentCourses from "./pages/parent/ParentCourses";
import ParentProgress from "./pages/parent/ParentProgress";
import ParentSchedule from "./pages/parent/ParentSchedule";
import ParentMessages from "./pages/parent/ParentMessages";
import ParentPayments from "./pages/parent/ParentPayments";
import ParentSettings from "./pages/parent/ParentSettings";

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
        <Route path="courses" element={<StudentCourses />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="messages" element={<StudentMessages />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="payments" element={<StudentPayments />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>
      <Route path="/tutor" element={<TutorDashboardLayout />}>
        <Route path="dashboard" element={<TutorDashboard />} />
        <Route path="courses" element={<TutorCourses />} />
        <Route path="students" element={<TutorStudents />} />
        <Route path="schedule" element={<TutorSchedule />} />
        <Route path="assignments" element={<TutorAssignments />} />
        <Route path="messages" element={<TutorMessages />} />
        <Route path="earnings" element={<TutorEarnings />} />
        <Route path="settings" element={<TutorSettings />} />
      </Route>
      <Route path="/parent" element={<ParentDashboardLayout />}>
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="children" element={<ParentChildren />} />
        <Route path="courses" element={<ParentCourses />} />
        <Route path="progress" element={<ParentProgress />} />
        <Route path="schedule" element={<ParentSchedule />} />
        <Route path="messages" element={<ParentMessages />} />
        <Route path="payments" element={<ParentPayments />} />
        <Route path="settings" element={<ParentSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
