import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Animation library
import { AiOutlineCheckCircle } from "react-icons/ai"; // Animated success icon

const SuccessModal = ({ message, show, onClose }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative"
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0.8, rotate: 0 }}
                            animate={{ scale: 1.2, rotate: 360 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="flex justify-center items-center mb-4"
                        >

                            <AiOutlineCheckCircle className="text-green-500 text-6xl" />
                        </motion.div>

                        {/* Modal Header */}
                        <div className="flex items-center justify-center gap-2 mb-4">

                            <h3 className="text-green-600 text-xl font-semibold">Success</h3>

                        </div>

                        {/* Message */}
                        <p className="text-gray-700 text-center">{message}</p>

                        {/* OK Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            OK
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
