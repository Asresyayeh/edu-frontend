import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Home";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import Banner from "./pages/Banner";
import WhyChooseTestimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import Service from "./pages/Service";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Courses />
      <Service />
      <Banner />
      <WhyChooseTestimonials />
      <Footer />
    </>
  );
}

export default App;
