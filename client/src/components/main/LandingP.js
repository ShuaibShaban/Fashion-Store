import React, { useEffect } from 'react';
import './LandingP.css'
const LandingP = () => {
  useEffect(() => {
    let currentSectionIndex = 0;
    const sections = document.querySelectorAll('.section');
    const maxSectionIndex = sections.length - 1;

    const scrollToSection = (index) => {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('wheel', (event) => {
      if (event.deltaY > 0) {
        currentSectionIndex = Math.min(currentSectionIndex + 1, maxSectionIndex);
      } else {
        currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
      }
      scrollToSection(currentSectionIndex);
    });
  }, []);

  return (
    <>
      <div className="section" style={{ backgroundColor: 'red' }}>
        Section 1
      </div>
      <div className="section" style={{ backgroundColor: 'green' }}>
        Section 2
      </div>
      <div className="section" style={{ backgroundColor: 'blue' }}>
        Section 3
      </div>
    </>
  );
};

export default LandingP;