import React from "react";
import startupimage from "../src/assets/Stratupimage.jpg";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { MdAdminPanelSettings } from "react-icons/md";

const StartupPage = () => {
  const navigateToDashboard = () => {
    window.location.href = "/login";
  };

  const navigateToAdminLogin =()=>{
    window.location.href="/admin-login"
  }

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${startupimage})` }}
    >
      {/* Top-left button with higher z-index */}
      <motion.button
        onClick={navigateToAdminLogin}
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md shadow-md transition"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        admin login
        <MdAdminPanelSettings  className="w-6 h-6 inline-block ml-2" />
      </motion.button>

      {/* Particle Effect */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 5 },
            move: { enable: true, speed: 3 },
          },
        }}
        className="absolute inset-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to the Internship Management System
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Streamline your recruitment, placement, and intern management all in
          one platform.
        </motion.p>

        <motion.button
          onClick={navigateToDashboard}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-lg font-medium rounded-md shadow-md transition"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartupPage;
 