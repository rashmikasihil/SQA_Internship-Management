import React, { useState } from 'react';
import InternForm from './InternRegistration';
import InstituteForm from './InstituteRegistration';
import { useSpring, animated } from '@react-spring/web';

const RegistrationPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipStyle = useSpring({
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-[50vw] h-[500px] perspective-1000">
        <animated.div
          style={flipStyle}
          className="relative w-full h-full text-center transform-style-preserve-3d"
        >
          {/* Front Side (Intern Form) */}
          <div
            className={`absolute inset-0 bg-white rounded-lg shadow-lg transform ${
              isFlipped ? 'rotateY-180 hidden' : 'rotateY-0'
            }`}
          >
            <InternForm onFlip={() => setIsFlipped(true)} />
          </div>

          {/* Back Side (Institute Form) */}
          <div
            className={`absolute inset-0 bg-white rounded-lg shadow-lg transform ${
              isFlipped ? 'rotateY-0' : 'rotateY-180 hidden'
            }`}
          >
            <InstituteForm onFlip={() => setIsFlipped(false)} />
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default RegistrationPage;
