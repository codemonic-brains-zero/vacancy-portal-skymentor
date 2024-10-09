import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const GuitarString = () => {
  const stringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event) => {
    if (isHovering) {
      const rect = stringRef.current.getBoundingClientRect();
      const xPos = event.clientX - rect.left;

      // We adjust yPos slightly to make it sensitive to the cursor's position.
      const yPos = event.clientY - rect.top;

      gsap.to(stringRef.current, {
        attr: { d: `M 10 100 Q ${xPos} ${yPos} 1400 100` },
        duration: 0.1,
        ease: "power3.out",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    gsap.to(stringRef.current, {
      attr: { d: `M 10 100 Q 700 100 1400 100` },
      duration: 1.5,
      ease: "elastic.out(1, 0.2)",
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <svg
      width="1400"
      height="300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        ref={stringRef}
        d="M 10 100 Q 700 150 1400 100"
        stroke="black"
        fill="transparent"
        strokeWidth="2"
      />
    </svg>
  );
};

export default GuitarString;
