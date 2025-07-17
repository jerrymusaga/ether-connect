import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AVATARS = ["🦄", "🐉", "🦊", "🦁", "🐼", "👾", "💖", "🌈", "🧙‍♂️", "🧑‍🚀"];
const INTERESTS = [
  "DeFi",
  "NFTs",
  "Gaming",
  "Music",
  "Art",
  "DAOs",
  "Memes",
  "Trading",
  "Collectibles",
  "Events",
];
const QUIZ = [
  {
    label: "Adventurer",
    icon: "🗺️",
    desc: "I love exploring new dApps and quests!",
  },
  {
    label: "Socialite",
    icon: "🎉",
    desc: "I thrive on making new friends and connections.",
  },
  {
    label: "Strategist",
    icon: "♟️",
    desc: "I plan my moves and optimize my onchain journey.",
  },
  {
    label: "Wildcard",
    icon: "🦄",
    desc: "I go with the flow and love surprises!",
  },
];

const steps = ["avatar", "profile", "interests", "quiz", "mode", "complete"];

export type OnboardingData = {
  avatar: string;
  username: string;
  age: number;
  location: string;
  interests: string[];
  bio: string;
  questStyle: string;
  mode: "dating" | "friendship";
};

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export default function OnboardingModal({
  onComplete,
}: {
  onComplete: (data: OnboardingData) => void;
}) {
  const [step, setStep] = useState(0);
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [quiz, setQuiz] = useState<number | null>(null);
  const [xp, setXp] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mode, setMode] = useState<"dating" | "friendship" | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  React.useEffect(() => {
    setXp(Math.min(step * 20, 100));
    if (step === steps.length - 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  }, [step]);

  const renderStep = () => {
    switch (steps[step]) {
      case "avatar":
        return (
          <motion.div
            key="avatar"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-[#C41E3A] mb-4"
            >
              Pick Your Avatar
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-6"
            >
              {AVATARS.map((a, index) => (
                <motion.button
                  key={a}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    transition: { 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  className={`text-4xl p-3 rounded-full border-2 transition-all duration-300 ${
                    avatar === a
                      ? "border-[#C41E3A] bg-pink-100 shadow-lg shadow-pink-300/50"
                      : "border-transparent hover:border-pink-300"
                  }`}
                  onClick={() => setAvatar(a)}
                  aria-label={a}
                >
                  {a}
                </motion.button>
              ))}
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
              className="mt-4 bg-[#FFA7E6] text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
              onClick={next}
              disabled={!avatar}
            >
              Next
            </motion.button>
          </motion.div>
        );

      case "profile":
        return (
          <motion.div
            key="profile"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-[#C41E3A] mb-4"
            >
              Create Your Profile
            </motion.h2>
            <motion.input
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              className="mb-3 px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-[#C41E3A] outline-none w-64 text-lg transition-all duration-300"
              placeholder="Username (e.g. EtherHero.eth)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={24}
            />
            <motion.input
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              className="mb-3 px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-[#C41E3A] outline-none w-64 text-lg transition-all duration-300"
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ""))}
              min={18}
              max={99}
            />
            <motion.input
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              className="mb-6 px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-[#C41E3A] outline-none w-64 text-lg transition-all duration-300"
              placeholder="Location (e.g. London)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={32}
            />
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#FFA7E6] text-white px-8 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"
              onClick={next}
              disabled={!username || !age || !location}
            >
              Next
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mt-2 text-sm text-gray-400 underline"
              onClick={prev}
            >
              Back
            </motion.button>
          </motion.div>
        );

      case "interests":
        return (
          <motion.div
            key="interests"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-[#C41E3A] mb-4"
            >
              Pick Your Interests
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-6 max-w-xs justify-center"
            >
              {INTERESTS.map((interest, index) => (
                <motion.button
                  key={interest}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                    interests.includes(interest)
                      ? "bg-pink-200 border-[#C41E3A] text-[#C41E3A] shadow-md shadow-pink-300/50"
                      : "bg-white border-pink-200 text-gray-600 hover:border-pink-300 hover:bg-pink-50"
                  }`}
                  onClick={() =>
                    setInterests((prev) =>
                      prev.includes(interest)
                        ? prev.filter((i) => i !== interest)
                        : [...prev, interest]
                    )
                  }
                >
                  {interest}
                </motion.button>
              ))}
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#FFA7E6] text-white px-8 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"
              onClick={next}
              disabled={interests.length < 2}
            >
              Next
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mt-2 text-sm text-gray-400 underline"
              onClick={prev}
            >
              Back
            </motion.button>
          </motion.div>
        );

      case "quiz":
        return (
          <motion.div
            key="quiz"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-[#C41E3A] mb-4"
            >
              Choose Your Quest Style
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-6 max-w-xs justify-center"
            >
              {QUIZ.map((q, i) => (
                <motion.button
                  key={q.label}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, y: 50, rotateY: -90 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateY: 0,
                    transition: { 
                      delay: i * 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  className={`flex flex-col items-center px-4 py-4 rounded-xl border-2 transition-all duration-300 w-32 h-32 ${
                    quiz === i
                      ? "bg-gradient-to-br from-pink-100 to-purple-100 border-[#C41E3A] text-[#C41E3A]"
                      : "bg-white border-pink-200 hover:border-pink-300 hover:bg-pink-50"
                  }`}
                  onClick={() => setQuiz(i)}
                >
                  <motion.span 
                    className="text-3xl mb-2"
                    animate={quiz === i ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {q.icon}
                  </motion.span>
                  <span className="font-bold text-[#C41E3A] mb-1 text-sm">
                    {q.label}
                  </span>
                  <span className="text-xs text-gray-500 text-center leading-tight">
                    {q.desc}
                  </span>
                </motion.button>
              ))}
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#FFA7E6] text-white px-8 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"
              onClick={next}
              disabled={quiz === null}
            >
              Next
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mt-2 text-sm text-gray-400 underline"
              onClick={prev}
            >
              Back
            </motion.button>
          </motion.div>
        );

      case "mode":
        return (
          <motion.div
            key="mode"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-[#C41E3A] mb-4"
            >
              Choose Your Journey
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-4 mb-6"
            >
              {/* Dating Mode Card */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, x: -100, rotateY: -45 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  rotateY: 0,
                  transition: { 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                className={`group cursor-pointer transition-all duration-300 ${
                  mode === "dating" ? "ring-4 ring-[#9a787d] rounded-2xl" : ""
                }`}
                onClick={() => setMode("dating")}
              >
                <div className="relative bg-gradient-to-br from-blue-100/60 to-purple-100/60 backdrop-blur-sm border-2 border-blue-300/50 rounded-2xl p-6 hover:border-blue-400/70 transition-all duration-300">
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ 
                        scale: mode === "dating" ? [1, 1.2, 1] : 1,
                        rotate: mode === "dating" ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      💕
                    </motion.div>
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      Dating Mode
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Find your perfect match
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Friendship Mode Card */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, x: 100, rotateY: 45 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  rotateY: 0,
                  transition: { 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                className={`group cursor-pointer transition-all duration-300 ${
                  mode === "friendship" ? "ring-4 ring-green-200 rounded-2xl" : ""
                }`}
                onClick={() => setMode("friendship")}
              >
                <div className="relative bg-gradient-to-br from-green-100/60 to-emerald-100/60 backdrop-blur-sm border-2 border-green-300/50 rounded-2xl p-6 hover:border-green-400/70 transition-all duration-300">
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ 
                        scale: mode === "friendship" ? [1, 1.2, 1] : 1,
                        rotate: mode === "friendship" ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      🤝
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                      Friendship Mode
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Build lasting friendships
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"
              onClick={() =>
                onComplete({
                  avatar,
                  username,
                  age: Number(age),
                  location,
                  interests,
                  bio: "",
                  questStyle: quiz !== null ? QUIZ[quiz].label : "",
                  mode: mode!,
                })
              }
              disabled={!mode}
            >
              Start Adventure
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mt-2 text-sm text-gray-400 underline"
              onClick={prev}
            >
              Back
            </motion.button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      
      {/* Enhanced XP bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72"
      >
        <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xp}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <motion.span 
          className="block text-center text-xs text-gray-400 mt-1"
          animate={{ scale: xp === 100 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          XP: {xp}/100
        </motion.span>
      </motion.div>
    </div>
  );
}