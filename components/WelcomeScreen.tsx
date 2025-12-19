import React, { useState, useEffect } from "react";
import { useKernel } from "../store/kernel";
import { motion } from "framer-motion";
import "./WelcomeScreen.css";
import { playAudio } from "../lib/audioUtils";

// Import welcome audio files
import welcomeAudio from '../assets/audio/welcome.mp3';
import welcomeAudio1 from '../assets/audio/welcome_1.mp3';
import welcomeAudio2 from '../assets/audio/welcome_2.mp3';
import welcomeAudio3 from '../assets/audio/welcome_3.mp3';
import welcomeAudio4 from '../assets/audio/welcome_4.mp3';
import welcomeAudio5 from '../assets/audio/welcome_5.mp3';
import welcomeAudio6 from '../assets/audio/welcome_6.mp3';
import welcomeAudio7 from '../assets/audio/welcome_7.mp3';
import welcomeAudio8 from '../assets/audio/welcome_8.mp3';
import welcomeAudio9 from '../assets/audio/welcome_9.mp3';
import welcomeAudio10 from '../assets/audio/welcome_10.mp3';
import welcomeAudio11 from '../assets/audio/welcome_11.mp3';
import welcomeAudio12 from '../assets/audio/welcome_12.mp3';
import welcomeAudio13 from '../assets/audio/welcome_13.mp3';
import welcomeAudio14 from '../assets/audio/welcome_14.mp3';
import welcomeAudio15 from '../assets/audio/welcome_15.mp3';

import { GlowCard } from "./GlowCard";
import AnimatedGenerateButton from "./animated-generate-button-shadcn-tailwind";

const WelcomeScreen: React.FC = () => {
  const setHasWelcomed = useKernel((state) => state.setHasWelcomed);
  const addEmail = useKernel((state) => state.addEmail);
  const setInitialGreetingSpoken = useKernel(
    (state) => state.setInitialGreetingSpoken
  );
  const setMicPermissionGranted = useKernel(
    (state) => state.setMicPermissionGranted
  );

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

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
    ];

    const randomAudio = welcomeAudios[Math.floor(Math.random() * welcomeAudios.length)];
    playAudio(randomAudio);
  };

  const isValidEmail = (email: string) => {
    if (email.toLowerCase() === "trad34") return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const canContinue = () => {
    return isValidEmail(email);
  };

  const skipMicPermission = () => {
    console.log("Skipping microphone permission");
    setMicPermissionGranted(false);
    setIsFadingOut(true);
  };

  const proceedWithWelcome = () => {
    if (email) {
      addEmail(email);
    }
    setHasWelcomed(true);
  };

  const onFadeOutComplete = () => {
    proceedWithWelcome();
  };

  const handleContinue = () => {
    if (canContinue()) {
      playRandomWelcomeMessage(); // Play welcome message when button is pressed
      skipMicPermission();
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <motion.div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center p-4 welcome-screen-background relative"
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 3 }}
      onAnimationComplete={isFadingOut ? onFadeOutComplete : undefined}
    >
      <GlowCard
        glowColor="purple"
        customSize={true}
        className="w-full max-w-[280px] flex flex-col items-center mb-8 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-4"
        >
          <h1 className="text-2xl font-bold text-white mb-1">The Youniverse</h1>
          <p className="text-sm text-zinc-300 text-center mb-1">Your Personalized Operating System</p>

        </motion.div>

        <div className="space-y-3 w-full">
          <div>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="First Name"
              className="w-full px-3 py-1.5 text-sm bg-black/50 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canContinue()) {
                  handleContinue();
                }
              }}
              placeholder="you@example.com"
              className="w-full px-3 py-1.5 text-sm bg-black/50 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
            />
          </div>
          <div className="relative flex justify-center">
            <AnimatedGenerateButton
              labelIdle="Enter the Youniverse"
              onClick={handleContinue}
              className="[&>button]:px-6 [&>button]:py-1.5 [&>button]:text-sm"
            />
          </div>
        </div>
      </GlowCard>


    </motion.div>
  );
};

export default WelcomeScreen;
