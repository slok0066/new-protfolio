import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, User, Code, Mail, ExternalLink, Github, Linkedin, Twitter, Gamepad2, BookOpen, Star, Coffee } from 'lucide-react';

interface Command {
  input: string;
  output: React.ReactNode;
  timestamp: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [isTyping, setIsTyping] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [hackMode, setHackMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);


  const asciiArt = `
  _____ _    _ _      ____  _  __
 / ____| |  | | |    / __ \\| |/ /
| (___ | |__| | |   | |  | | ' / 
 \\___ \\|  __  | |   | |  | |  <  
 ____) | |  | | |___| |__| | . \\
|_____/|_|  |_|______\\____/|_|\\_\\

        🚀 SHLOK Student Developer Portfolio 🚀
  `;
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      }
    }, [currentIndex, text, speed]);

    return <span>{displayText}</span>;
  };

  const MatrixRain: React.FC = () => {
    useEffect(() => {
      const timer = setTimeout(() => setShowMatrix(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          >
            {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
          </motion.div>
        ))}
      </div>
    );
  };

  const commands = {
    help: () => (
      <div className="text-yellow-400">
        <TypewriterText text="Hey! Here's what you can do:" />
        <div className="ml-4 mt-2 space-y-1">
          <p><span className="text-cyan-400">about</span> - Who is this Shlok guy?</p>
          <p><span className="text-cyan-400">skills</span> - What can I actually do?</p>
          <p><span className="text-cyan-400">projects</span> - Cool stuff I've built</p>
          <p><span className="text-cyan-400">hobbies</span> - When I'm not studying</p>
          <p><span className="text-cyan-400">contact</span> - Let's be friends!</p>
          <p><span className="text-cyan-400">social</span> - Find me online</p>
          <p><span className="text-cyan-400">matrix</span> - Something cool happens 😉</p>
          <p><span className="text-cyan-400">hack</span> - Feel like a hacker</p>
          <p><span className="text-cyan-400">motivate</span> - Need a boost?</p>
          <p><span className="text-cyan-400">clear</span> - Clean slate</p>
          <p><span className="text-cyan-400">whoami</span> - Quick identity check</p>
        </div>
      </div>
    ),
    
    about: () => (
      <div className="text-white space-y-2">
        <p className="text-cyan-400 text-lg">👋 Hey there! Nice to meet you!</p>
        <div className="border border-green-400 p-3 rounded mt-2">
          <p className="text-yellow-400">Quick intro about me:</p>
          <p>🙋‍♂️ <span className="text-green-400">Name:</span> Shlok (that's me!)</p>
          <p>🎂 <span className="text-green-400">Age:</span> 16 (yeah, I'm still young but passionate!)</p>
          <p>📚 <span className="text-green-400">Currently:</span> Surviving 11th grade</p>
          <p>💻 <span className="text-green-400">What I do:</span> Code, learn, and build cool things</p>
          <p>☕ <span className="text-green-400">Fuel:</span> Coffee and curiosity</p>
        </div>
        <br />
        <p>Just a regular student who loves coding and building cool stuff. Balancing school and projects is tough, but I enjoy every bit of it!</p>
        <br />
        <p className="text-green-400">💡 Random fact: My room is 70% code, 30% chaos!</p>
      </div>
    ),

    skills: () => (
      <div className="text-white">
        <p className="text-cyan-400 text-lg mb-3">🛠️ What I can actually do</p>
        <p className="text-gray-300 mb-3">Honestly? I'm still learning, but here's where I stand:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-blue-400 p-3 rounded">
            <p className="text-yellow-400 mb-2">Web Development:</p>
            <div className="ml-4 space-y-1 text-sm">
              <p>JavaScript - Pretty comfortable with it now</p>
              <p>React - My favorite! Still learning new tricks</p>
              <p>HTML/CSS - Been doing this since I started</p>
              <p>Tailwind - Makes styling so much easier</p>
              <p>TypeScript - Working on getting better at this</p>
            </div>
          </div>
          
          <div className="border border-purple-400 p-3 rounded">
            <p className="text-yellow-400 mb-2">Other Stuff:</p>
            <div className="ml-4 space-y-1 text-sm">
              <p>Python - Love it for quick scripts</p>
              <p>Node.js - Building APIs is fun</p>
              <p>Git - No more losing my code!</p>
              <p>Firebase - Easy backend for projects</p>
              <p>MongoDB - Still figuring databases out</p>
            </div>
          </div>
        </div>

        <div className="mt-4 border border-green-400 p-3 rounded">
          <p className="text-yellow-400 mb-2">What I'm learning next:</p>
          <div className="ml-4 space-y-1 text-green-400 text-sm">
            <p>🤖 AI/ML - Because it's everywhere now</p>
            <p>📱 React Native - Want to build mobile apps</p>
            <p>☁️ AWS - Cloud stuff seems important</p>
            <p>🎮 Game development - Just for fun</p>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mt-3">
          Real talk: I'm nowhere near perfect, but I love learning and building!
        </p>
      </div>
    ),

    projects: () => (
      <div className="text-white">
        <p className="text-cyan-400 text-2xl font-bold mb-2 flex items-center gap-2">🚀 Projects</p>
        <p className="text-gray-300 text-sm mb-6">A few things I've built and shipped:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ThinkBuild Agency */}
          <div className="bg-gradient-to-br from-yellow-900/60 to-yellow-700/30 border-2 border-yellow-400 rounded-xl shadow-lg p-5 hover:scale-[1.03] hover:shadow-yellow-400/40 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💼</span>
              <span className="text-yellow-300 font-semibold text-lg">ThinkBuild Agency</span>
            </div>
            <p className="text-gray-300 text-xs mb-2">Web & App Development Agency</p>
            <p className="mb-2">A modern agency for building websites and apps for clients. Focused on quality, speed, and great design.</p>
            <p className="text-green-400 text-xs">🚀 Helping businesses go digital</p>
          </div>

          {/* Testimonial Hub */}
          <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/30 border-2 border-blue-400 rounded-xl shadow-lg p-5 hover:scale-[1.03] hover:shadow-blue-400/40 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🗣️</span>
              <span className="text-blue-300 font-semibold text-lg">Testimonial Hub</span>
            </div>
            <p className="text-gray-300 text-xs mb-2">Automated testimonial collection platform</p>
            <p className="mb-2">Users can share a form, and when someone submits a testimonial, it is auto-added to the site. Makes collecting and displaying feedback easy.</p>
            <p className="text-green-400 text-xs">💬 Real feedback, instantly live</p>
          </div>

          {/* MeetSync */}
          <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/30 border-2 border-purple-400 rounded-xl shadow-lg p-5 hover:scale-[1.03] hover:shadow-purple-400/40 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📅</span>
              <span className="text-purple-300 font-semibold text-lg">MeetSync</span>
            </div>
            <p className="text-gray-300 text-xs mb-2">Meeting booking integration</p>
            <p className="mb-2">Embed a button or link so customers can book meetings directly. Simplifies scheduling for businesses and clients.</p>
            <p className="text-green-400 text-xs">🔗 Easy meeting scheduling</p>
          </div>

          {/* Portfolio */}
          <div className="bg-gradient-to-br from-green-900/60 to-green-700/30 border-2 border-green-400 rounded-xl shadow-lg p-5 hover:scale-[1.03] hover:shadow-green-400/40 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌐</span>
              <span className="text-green-300 font-semibold text-lg">My Portfolio</span>
            </div>
            <p className="text-gray-300 text-xs mb-2">Personal developer portfolio</p>
            <p className="mb-2">Showcasing my projects, skills, and journey as a developer. Built with modern web tech and lots of passion.</p>
            <p className="text-green-400 text-xs">✨ You're looking at it!</p>
          </div>
        </div>
      </div>
    ),

    // academics command removed

    hobbies: () => (
      <div className="text-white space-y-3">
        <p className="text-cyan-400 text-lg">🎮 When I'm not staring at code</p>
        <p className="text-gray-300 text-sm">Life's not all about programming (shocking, I know):</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-400 p-3 rounded">
            <p className="text-yellow-400 mb-2">🎮 Gaming stuff:</p>
            <div className="ml-4 space-y-1 text-sm">
              <p>🔫 Valorant - Diamond rank (pretty proud of this!)</p>
              <p>⚔️ Minecraft - Building redstone contraptions</p>
              <p>🧠 Chess - 1200 rating on Chess.com</p>
              <p>🏎️ Rocket League - Still learning to fly</p>
              <p>💀 Among Us - With the school friends</p>
            </div>
          </div>
          
          <div className="border border-green-400 p-3 rounded">
            <p className="text-yellow-400 mb-2">📚 Other interests:</p>
            <div className="ml-4 space-y-1 text-sm">
              <p>🎸 Guitar - Playing for 2 years now</p>
              <p>📸 Photography - Mostly random shots</p>
              <p>🏃 Running - Helps clear my head</p>
              <p>🍳 Cooking - Instant noodles count, right?</p>
              <p>📺 YouTube - Way too much tech content</p>
            </div>
          </div>
        </div>

        <div className="border border-yellow-400 p-3 rounded">
          <p className="text-yellow-400 mb-2">🌟 Current obsessions:</p>
          <div className="ml-4 space-y-1 text-sm">
            <p>🎵 Lo-fi playlists while coding (essential!)</p>
            <p>☕ Trying different coffee brewing methods</p>
            <p>📱 Watching iOS app development tutorials</p>
            <p>🎬 Tech YouTubers like Fireship and ThePrimeTime</p>
            <p>🌃 Taking random photos during evening walks</p>
            <p>🎮 Speedrunning indie games on weekends</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm">
          Fun fact: I've probably spent more time customizing my VS Code setup than actually coding. No regrets! 🎨
        </p>
      </div>
    ),

    contact: () => (
      <div className="text-white space-y-2">
        <p className="text-cyan-400 text-lg">📞 Want to get in touch?</p>
        <p className="text-gray-300 text-sm">I'm always up for making new friends or talking about code!</p>
        
        <div className="border border-cyan-400 p-3 rounded space-y-1">
          <p>📧 <span className="text-yellow-400">Email:</span> singhsloks64@gmail.com</p>
          <p>📱 <span className="text-yellow-400">WhatsApp:</span> Ask me for it!</p>
          <p>🌍 <span className="text-yellow-400">Location:</span> Somewhere in India 🇮🇳</p>
          <p>⏰ <span className="text-yellow-400">Available:</span> After 4 PM (school, you know?)</p>
        </div>
        
        <div className="border border-green-400 p-3 rounded mt-3">
          <p className="text-green-400 mb-2">💬 I love talking about:</p>
          <div className="ml-4 text-sm space-y-1">
            <p>• Cool coding projects and ideas</p>
            <p>• Game development and indie games</p>
            <p>• Study tips and productivity hacks</p>
            <p>• Valorant strategies (if you're into that)</p>
            <p>• Random tech news and trends</p>
            <p>• Life as a student developer</p>
          </div>
        </div>

        <p className="text-yellow-400 text-sm">
          ⚡ Response time: Usually within a few hours (unless I'm debugging something complicated!)
        </p>
      </div>
    ),

    social: () => (
      <div className="text-white space-y-2">
        <p className="text-cyan-400 text-lg">🌐 Find me around the internet</p>
        <p className="text-gray-300 text-sm">Here's where you can actually reach me:</p>
        
        <div className="space-y-3">
          <div className="border border-blue-400 p-3 rounded">
            <p>💼 <span className="text-yellow-400">LinkedIn:</span></p>
            <p className="text-green-400 ml-4 text-sm break-all">
              https://www.linkedin.com/in/shlok-singh-3aab2834a
            </p>
            <p className="text-xs text-gray-400 ml-4">
              ↳ My professional profile (still building it!)
            </p>
          </div>
          
          <div className="border border-pink-400 p-3 rounded">
            <p>📷 <span className="text-yellow-400">Instagram:</span></p>
            <p className="text-green-400 ml-4 text-sm">@king_togetherness</p>
            <p className="text-xs text-gray-400 ml-4">
              ↳ Random stuff, coding screenshots, and life updates
            </p>
          </div>
        </div>
        
        <div className="border border-green-400 p-3 rounded mt-3">
          <p className="text-yellow-400 mb-2">📊 Best ways to reach me:</p>
          <div className="ml-4 text-sm space-y-1">
            <p>🔥 <span className="text-green-400">Most responsive:</span> Instagram DMs</p>
            <p>💼 <span className="text-blue-400">Professional stuff:</span> LinkedIn messages</p>
            <p>💬 <span className="text-yellow-400">Quick chats:</span> Instagram is your best bet!</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm">
          💡 I'm more active on Instagram, so slide into my DMs if you want to chat! 📱
        </p>
      </div>
    ),

    matrix: () => {
      setShowMatrix(true);
      return (
        <div className="text-green-400">
          <p className="text-red-400">ACCESSING THE MATRIX...</p>
          <p className="text-green-400 mt-2">Welcome to the real world, Neo... 😎</p>
          <p className="text-cyan-400">There is no spoon... only code.</p>
          <p className="text-yellow-400 mt-1">Fun fact: This effect is just CSS animations!</p>
        </div>
      );
    },

    hack: () => {
      setHackMode(!hackMode);
      return (
        <div className="text-green-400">
          <p className="text-red-400">🔴 HACKER MODE {hackMode ? 'ACTIVATED' : 'DEACTIVATED'}</p>
          <p className="text-green-400">Access Level: {hackMode ? 'ROOT' : 'USER'}</p>
          <p className="text-yellow-400">Status: {hackMode ? 'I\'m in! 😎' : 'Back to normal'}</p>
          <p className="text-gray-400 text-sm mt-1">
            {hackMode ? 'Now you look like a real hacker!' : 'Just a regular terminal again'}
          </p>
        </div>
      );
    },

    motivate: () => {
      const motivations = [
        "You're 16 and already building cool stuff. That's amazing! 🚀",
        "Every bug you fix makes you a better developer. Keep going! 💪",
        "Remember: Google exists, Stack Overflow is your friend, and coffee helps! ☕",
        "Your future self will thank you for every line of code you write today. 📈",
        "Being a student developer is tough, but you're tougher! 🔥"
      ];
      
      const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
      
      return (
        <div className="text-white">
          <p className="text-yellow-400 text-lg">💪 Daily motivation boost!</p>
          <div className="border border-green-400 p-3 rounded mt-2">
            <p className="text-green-400 text-lg">"{randomMotivation}"</p>
            <p className="text-yellow-400 mt-2">Now go build something awesome! ⚡</p>
          </div>
        </div>
      );
    },

    whoami: () => (
      <div className="text-green-400">
        <p>shlok@student-dev:~$ whoami</p>
        <br />
        <p><span className="text-cyan-400">Name:</span> Shlok</p>
        <p><span className="text-yellow-400">Role:</span> Student Developer & Dreamer</p>
        <p><span className="text-white">Status:</span> Caffeinated and ready to code! ☕</p>
        <p><span className="text-gray-400">Location:</span> Probably debugging something</p>
      </div>
    ),

    ls: () => (
      <div className="text-cyan-400 space-y-1">
        <p className="text-yellow-400">Contents of /home/shlok:</p>
        <div className="ml-4 mt-2">
          <p>📁 school-stuff/          📁 coding-projects/</p>
          <p>📁 random-ideas/          📁 games/</p>
          <p>📁 photos/               📁 music/</p>
          <p>📄 homework.txt          📄 project-ideas.md</p>
          <p>📄 .secrets              📄 coffee-tracker.json</p>
          <p>📄 bug-fixes.log         📄 dreams.txt</p>
        </div>
      </div>
    ),

    clear: () => null
  };

  useEffect(() => {
    const welcomeCommand: Command = {
      input: '',
      output: (
        <div>
          <pre className="text-green-400 text-xs leading-tight font-mono whitespace-pre">{asciiArt}</pre>
          <div className="mt-4 text-white">
            <p className="text-cyan-400 text-lg">🎉 Hey! Welcome to my digital space!</p>
            <p className="mt-2">I'm Shlok, a 16-year-old who loves building things with code.</p>
            <p>Currently surviving 11th grade while working on side projects.</p>
            <p className="mt-2">Type <span className="text-yellow-400">'help'</span> to see what you can explore here!</p>
            <p className="text-green-400 mt-2">💡 Try 'matrix' or 'hack' if you want something fun! 😉</p>
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString()
    };
    
    setHistory([welcomeCommand]);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const commandName = input.trim().toLowerCase();
    let output: React.ReactNode;

    if (commandName === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (commands[commandName as keyof typeof commands]) {
      output = commands[commandName as keyof typeof commands]();
    } else {
      output = (
        <div className="text-red-400">
          <p>Hmm, '{input}' isn't a command I know...</p>
          <p>Type 'help' to see what I can do!</p>
          <p className="text-yellow-400 text-sm mt-1">💡 Maybe try 'motivate' if you need a boost? 🚀</p>
        </div>
      );
    }

    const newCommand: Command = {
      input,
      output,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newCommand]);
    setInput('');
  };

  const prompt = hackMode 
    ? `root@matrix:${currentDirectory}# ` 
    : `shlok@dev:${currentDirectory}$ `;

  return (
    <div className="h-screen flex flex-col bg-black text-green-400 font-mono relative">
      {showMatrix && <MatrixRain />}
      
      {/* Terminal Header */}
      <div className={`${hackMode ? 'bg-red-900' : 'bg-gray-900'} border-b border-gray-700 p-2 flex items-center space-x-2`}>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2 text-white text-sm">
          <TerminalIcon size={16} />
          <span>{hackMode ? 'MATRIX-TERMINAL' : 'shlok-portfolio'}</span>
          {hackMode && <span className="text-red-400 animate-pulse">🔴 HACKER MODE</span>}
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Coffee size={14} className="text-yellow-400" />
          <span className="text-xs">Powered by Coffee & Dreams ☕</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {history.map((command, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              {command.input && (
                <div className="flex items-center space-x-2">
                  <span className={hackMode ? "text-red-400" : "text-cyan-400"}>{prompt}</span>
                  <span className="text-white">{command.input}</span>
                </div>
              )}
              {command.output && (
                <motion.div 
                  className="ml-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {command.output}
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <span className={hackMode ? "text-red-400" : "text-cyan-400"}>{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            autoComplete="off"
            spellCheck="false"
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={hackMode ? "text-red-400" : "text-white"}
          >
            █
          </motion.span>
        </form>
      </div>

      {/* Bottom Status Bar */}
      <div className={`${hackMode ? 'bg-red-900' : 'bg-gray-900'} border-t border-gray-700 p-2 text-xs text-gray-400 flex justify-between items-center`}>
        <div className="flex items-center space-x-4">
          <span>Terminal v2024.1</span>
          <span className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-400" />
            <span>Student Developer Edition</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Age: 16 | Grade: 11th | Status: Caffeinated</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
