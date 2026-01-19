// ============================================================================
// IMPORTS
// ============================================================================
// React core and hooks for component functionality
import React, { useRef, useEffect, useState, useCallback } from "react";
// Global state management for user session data
import { useKernel } from "../store/kernel";
// Animation library for smooth transitions and effects
import { motion } from "framer-motion";
// Audio playback utility
import { playAudio } from "../lib/audioUtils";
// Minimalist text effect component
import { MinimalistTextEffect } from "./MinimalistTextEffect";
// Background image styling for this welcome screen
import "../components/WelcomeScreen.css";
// ASMR animated background for inside the circle
import { AsmrBackground } from "../components/AsmrBackground";
// Shatter button component
import { Component as ShatterButton } from "../@/components/ui/shatter-button";

// ============================================================================
// AUDIO CONSTANTS
// ============================================================================
// 15 different welcome audio messages that play randomly when user submits email
const welcomeAudio = "/assets/audio/welcome.mp3";
const welcomeAudio1 = "/assets/audio/welcome_1.mp3";
const welcomeAudio2 = "/assets/audio/welcome_2.mp3";
const welcomeAudio3 = "/assets/audio/welcome_3.mp3";
const welcomeAudio4 = "/assets/audio/welcome_4.mp3";
const welcomeAudio5 = "/assets/audio/welcome_5.mp3";
const welcomeAudio6 = "/assets/audio/welcome_6.mp3";
const welcomeAudio7 = "/assets/audio/welcome_7.mp3";
const welcomeAudio8 = "/assets/audio/welcome_8.mp3";
const welcomeAudio9 = "/assets/audio/welcome_9.mp3";
const welcomeAudio10 = "/assets/audio/welcome_10.mp3";
const welcomeAudio11 = "/assets/audio/welcome_11.mp3";
const welcomeAudio12 = "/assets/audio/welcome_12.mp3";
const welcomeAudio13 = "/assets/audio/welcome_13.mp3";
const welcomeAudio14 = "/assets/audio/welcome_14.mp3";
const welcomeAudio15 = "/assets/audio/welcome_15.mp3";
const welcomeAudio16 = "/assets/audio/welcome_16.mp3";
const welcomeAudio17 = "/assets/audio/welcome_17.mp3";
const welcomeAudio18 = "/assets/audio/welcome_18.mp3";
const welcomeAudio19 = "/assets/audio/welcome_19.mp3";
const welcomeAudio20 = "/assets/audio/welcome_20.mp3";
const welcomeAudio21 = "/assets/audio/welcome_21.mp3";
// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
// Props for the interactive EmailFieldComponent
interface EmailFieldProps {
  placeholder?: string;                    // Text shown when field is empty
  onSubmit?: (value: string) => void;      // Callback when user submits email
  disabled?: boolean;                      // Whether the field is interactive
}

// ============================================================================
// EXPORTED COMPONENT
// ============================================================================
const WelcomeScreen: React.FC = () => {
  // EMAIL FIELD COMPONENT
  const EmailFieldComponent = ({
    placeholder = "Enter Email",
    onSubmit = (value: string) => console.log("Submitted:", value),
    disabled = false,
  }: EmailFieldProps) => {
    // ------------------------------------------------------------------------
    // REFS - Direct DOM element access
    // ------------------------------------------------------------------------
    const svgRef = useRef<SVGSVGElement>(null);      // Reference to SVG for gradient calculations
    const inputRef = useRef<HTMLInputElement>(null);  // Reference to input for programmatic focus

    // ------------------------------------------------------------------------
    // STATE - Component data that changes over time
    // ------------------------------------------------------------------------
    const [isHovered, setIsHovered] = useState(false);                      // Whether mouse is over the field
    const [isFocused, setIsFocused] = useState(false);                      // Whether input is focused
    const [ripplePosition, setRipplePosition] = useState({ cx: "50%", cy: "50%" }); // Gradient center position
    const [isDark, setIsDark] = useState(false);                            // Dark mode detection
    const [value, setValue] = useState("");                                 // Current email input value

    // ------------------------------------------------------------------------
    // EFFECT: Dark Mode Detection
    // ------------------------------------------------------------------------
    // Watches for changes to the document's dark mode class and updates styling accordingly
    useEffect(() => {
      const checkDark = () => {
        if (typeof window !== "undefined") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      };
      checkDark();
      const observer = new MutationObserver(checkDark);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
    }, []);

    // ------------------------------------------------------------------------
    // HANDLER: Mouse Move for Gradient Following
    // ------------------------------------------------------------------------
    // Calculates cursor position relative to SVG and updates gradient center directly
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
        const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;

        setRipplePosition({
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`,
        });
      }
    }, []);

    // ------------------------------------------------------------------------
    // HANDLER: Form Submission
    // ------------------------------------------------------------------------
    // Processes email submission and clears the field
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim() && onSubmit && !disabled) {
        onSubmit(value.trim());
        setValue("");
      }
    };

    // ------------------------------------------------------------------------
    // COMPUTED VALUES
    // ------------------------------------------------------------------------
    // BRIGHT gradient colors for maximum visibility on first pass
    const gradientStops = isDark
      ? [
        <stop key="dark-0" offset="0%" stopColor="#ffffff" />,      // Pure white center
        <stop key="dark-1" offset="50%" stopColor="#e0e0e0" />,     // Bright gray
        <stop key="dark-2" offset="100%" stopColor="#909090" />     // Medium gray
      ]
      : [
        <stop key="light-0" offset="0%" stopColor="#ffffff" />,     // Pure white center
        <stop key="light-1" offset="50%" stopColor="#d0d0d0" />,    // Bright gray
        <stop key="light-2" offset="100%" stopColor="#808080" />    // Medium gray
      ];

    const isActive = isHovered || isFocused;

    // ------------------------------------------------------------------------
    // RENDER: Component UI
    // ------------------------------------------------------------------------
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[200px]">
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
          <div
            className="relative w-full h-16 flex items-center justify-center cursor-text"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => inputRef.current?.focus()}
          >
            {/* ============ MINIMALIST TEXT EFFECT ============ */}
            {/* Invisible until hover - reveals with gradient following mouse */}
            <div className="absolute inset-0 pointer-events-none">
              <MinimalistTextEffect text={placeholder} duration={0.3} />
            </div>

            {/* ============ ACTUAL INPUT FIELD ============ */}
            {/* Appears when user clicks - transparent with blinking cursor */}
            <motion.input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className="w-full h-12 px-4 bg-transparent border-none text-white text-center placeholder:text-gray-500 focus:outline-none transition-all font-mono tracking-wider"
              style={{
                caretColor: 'white',
              }}
              placeholder=""
              animate={{
                opacity: isFocused ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* ============ WHITE LINE - ALWAYS VISIBLE ============ */}
            {/* Static white underline that's always shown for email entry */}
            <div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
              style={{
                width: '80%',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              }}
            />
          </div>
        </form>
      </div>
    );
  };

  // ============================================================================
  // WELCOME SCREEN COMPONENT
  // ============================================================================
  // Main landing page with background image, title, and email collection
  // ------------------------------------------------------------------------
  // GLOBAL STATE - Kernel store actions
  // ------------------------------------------------------------------------
  const setHasWelcomed = useKernel((state) => state.setHasWelcomed);
  const addEmail = useKernel((state) => state.addEmail);
  const collectedEmails = useKernel((state) => state.collectedEmails);
  const setInitialGreetingSpoken = useKernel(
    (state) => state.setInitialGreetingSpoken
  );
  const setMicPermissionGranted = useKernel(
    (state) => state.setMicPermissionGranted
  );

  // ------------------------------------------------------------------------
  // LOCAL STATE
  // ------------------------------------------------------------------------
  const [isFadingOut, setIsFadingOut] = useState(false);  // Controls exit animation
  const [isShatterAnimating, setIsShatterAnimating] = useState(false); // Controls shatter animation delay
  const [showEmailEntry, setShowEmailEntry] = useState(collectedEmails.length === 0); // Show email field for new users

  // ------------------------------------------------------------------------
  // HANDLER: Random Welcome Audio
  // ------------------------------------------------------------------------
  // Selects and plays one of 15 random welcome messages
  const playRandomWelcomeMessage = () => {
    const welcomeAudios = [
      welcomeAudio,
      welcomeAudio1,
      welcomeAudio2,
      welcomeAudio3,
      welcomeAudio4,
      welcomeAudio5,
      welcomeAudio6,
      welcomeAudio7,
      welcomeAudio8,
      welcomeAudio9,
      welcomeAudio10,
      welcomeAudio11,
      welcomeAudio12,
      welcomeAudio13,
      welcomeAudio14,
      welcomeAudio15,
      welcomeAudio16,
      welcomeAudio17,
      welcomeAudio18,
      welcomeAudio19,
      welcomeAudio20,
      welcomeAudio21,
    ];

    const randomAudio =
      welcomeAudios[Math.floor(Math.random() * welcomeAudios.length)];
    playAudio(randomAudio, undefined, 0.3); // Set volume to 30%
  };

  // ------------------------------------------------------------------------
  // VALIDATOR: Email Format
  // ------------------------------------------------------------------------
  // Checks if input is valid email or special admin code "trad34"
  const isValidEmail = (email: string) => {
    if (email.toLowerCase() === "trad34") return true;  // Admin bypass
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ------------------------------------------------------------------------
  // HANDLER: Skip Microphone Permission
  // ------------------------------------------------------------------------
  // Sets mic permission to false and triggers fade-out animation
  const skipMicPermission = () => {
    console.log("Skipping microphone permission");
    setMicPermissionGranted(false);
    setIsFadingOut(true);
  };

  // ------------------------------------------------------------------------
  // HANDLER: Proceed to Main App
  // ------------------------------------------------------------------------
  // Marks welcome screen as completed in global state
  const proceedWithWelcome = () => {
    setHasWelcomed(true);
  };

  // ------------------------------------------------------------------------
  // HANDLER: Animation Complete Callback
  // ------------------------------------------------------------------------
  // Called when fade-out animation finishes, proceeds to main app
  const onFadeOutComplete = () => {
    proceedWithWelcome();
  };

  // ------------------------------------------------------------------------
  // HANDLER: Email Submission
  // ------------------------------------------------------------------------
  // Main flow: validate → save email → play audio → start exit animation
  const handleEmailSubmit = (email: string) => {
    if (isValidEmail(email)) {
      addEmail(email);              // Save to global state
      playRandomWelcomeMessage();   // Play random greeting
      skipMicPermission();          // Skip mic setup and begin exit
    }
  };

  // ------------------------------------------------------------------------
  // HANDLER: Shatter Button Click
  // ------------------------------------------------------------------------
  // Explodes the button and shows the email field after animation completes
  const handleShatterClick = () => {
    setIsShatterAnimating(true);
    // Wait for shatter animation to complete before showing email field
    setTimeout(() => {
      setShowEmailEntry(true);
      setIsShatterAnimating(false);
    }, 1000); // 1 second delay matches shatter animation duration
  };

  // ------------------------------------------------------------------------
  // RENDER: Welcome Screen UI
  // ------------------------------------------------------------------------
  return (
    <motion.div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center p-2 welcome-screen-background relative"
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 6, ease: "easeOut" }}
      onAnimationComplete={isFadingOut ? onFadeOutComplete : undefined}
    >
      {/* ============ ASMR BACKGROUND - FULL SCREEN ============ */}
      {/* Animated particle effect covering entire screen */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <AsmrBackground />
      </div>

      {/* ============ PORTAL FRAME OVERLAY - FULL SCREEN ============ */}
      {/* Portal image on top of particles for depth effect */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <img
          src="/assets/images/you.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      <div className="relative w-full max-w-md flex items-center justify-center" style={{ zIndex: 20 }}>
        {/* ============ TITLE SECTION ============ */}
        {/* Brand name with subtle fade-in - positioned below center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 5, delay: 0.5, ease: "easeOut" }}
          className="absolute top-96 left-0 right-0 text-center"
        >
          <h1 className="text-4xl font-bold text-white" style={{ letterSpacing: '0.3em' }}>The Youniverse</h1>
        </motion.div>

        {/* ============ SHATTER BUTTON - RETURNING USERS ============ */}
        {/* Shows for users who have submitted email before - explodes to reveal email field */}
        {(!showEmailEntry || isShatterAnimating) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center"
          >
            <ShatterButton
              onClick={handleShatterClick}
              shatterColor="#00ffff"
              shardCount={30}
              className="px-6! py-2! text-xs"
            >
              <span></span>
            </ShatterButton>
          </motion.div>
        )}

        {/* ============ EMAIL COLLECTION SECTION ============ */}
        {/* Interactive email field - shows for new users or after button click */}
        {showEmailEntry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EmailFieldComponent
              placeholder="Enter Email"
              onSubmit={handleEmailSubmit}
              disabled={false}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
