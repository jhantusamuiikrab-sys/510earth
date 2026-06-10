import { useCallback, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [engineReady, setEngineReady] = useState(false);

  // Initialize the tsParticles engine with the slim bundle
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
    setEngineReady(true);
  }, []);

  // Configure options to build the interactive connecting nodes
  const options = useMemo(() => ({
    fullScreen: { enable: false }, // Restricts the canvas bounds to its parent container
    background: {
      color: { value: "transparent" }, // Ensures your background images show through
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push", // Spawns 4 new connected nodes instantly on click
        },
        onHover: {
          enable: true,
          mode: "grab", // Draws interactive vector lines directly to the cursor
        },
      },
      modes: {
        push: { quantity: 4 },
        grab: { 
          distance: 200, // Distance (in px) around the mouse where lines attach
          links: { opacity: 0.6 } 
        },
      },
    },
    particles: {
      color: { value: "#007bff" }, // Color of the floating dots (matches blue theme)
      links: {
        color: "#007bff", // Color of the structural web strings
        distance: 140,    // Maximum length of lines connecting individual dots
        enable: true,     // Enables the connecting web grid lines
        opacity: 0.4,
        width: 1.2,
      },
      move: {
        enable: true,
        speed: 1.5,       // Ambient movement velocity of the dots
        direction: "none",
        outModes: { default: "out" }, // Dots re-enter from sides when leaving bounds
      },
      number: {
        density: { enable: true, area: 800 },
        value: 90,        // Total number of initial node seeds scattered on screen
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  return (
    <div 
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 3,            // Places it above background images but behind forms
        pointerEvents: "all", // Captures hover interactions across open layout spaces
        visibility: engineReady ? "visible" : "hidden"
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="w-100 h-100"
      />
    </div>
  );
};

export default ParticleBackground;