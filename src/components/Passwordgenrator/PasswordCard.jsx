import { useState, useCallback, useEffect, useRef } from "react";
// import "App.css"


export default function Passwordgenrator() {

  //useState hook
  const [length, setLength] = useState(8);
  const [numallowed, setNumAllowed] = useState(false);
  const [charallowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);

  const pwdGenrator = useCallback(() => {
    let pass = [];
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const digits = "0123456789";
    const specials = "$%&'()+,-./:;<=>?@[]^_`{|}~";

    // Always start with basic characters
    let allChars = str;

    // Track mandatory characters
    if (numallowed) {
      const randDigit = digits[Math.floor(Math.random() * digits.length)];
      pass.push(randDigit);
      allChars += digits;
    }

    if (charallowed) {
      const randSpecial = specials[Math.floor(Math.random() * specials.length)];
      pass.push(randSpecial);
      allChars += specials;
    }

    // Fill the remaining password
    const remainingLength = length - pass.length;
    for (let i = 0; i < remainingLength; i++) {
      const randChar = allChars[Math.floor(Math.random() * allChars.length)];
      pass.push(randChar);
    }

    // Shuffle the array to randomize order
    for (let i = pass.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pass[i], pass[j]] = [pass[j], pass[i]];
    }

    setPassword(pass.join(""));
  }, [length, numallowed, charallowed, setPassword]);


  // const copyPwdToClipBoard = useCallback(() => {
  //   passwordRef.current?.select();
  //   passwordRef.current?.setSelectionRange(0,);
  //   window.navigator.clipboard.writeText(password);
  // }, [password])


  const copyPwdToClipBoard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard
        .writeText(password)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2s
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
    }
  }, [password]);




  //useEffect hook
  useEffect(() => {
    pwdGenrator();
  }, [length, numallowed, charallowed, pwdGenrator])




  return (
    <div className="w-full max-w-lg mx-auto my-6 sm:px-6">
      <div className="bg-gray-700 text-orange-500 rounded-2xl shadow-2xl p-5 sm:p-6 border border-orange-400/20">

        <h1 className="text-white text-xl sm:text-3xl font-bold text-center mb-5 sm:mb-6">
          🔐 Password Generator
        </h1>

        {/* Password Field and Copy Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          <div className="relative flex-grow">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-full px-3 py-2 text-sm sm:text-base text-black rounded-lg bg-white shadow-inner outline-none overflow-x-auto"
              placeholder="Your secure password"
            />
          </div>

          <div className="relative group self-center sm:self-auto">

            <button
              onClick={copyPwdToClipBoard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              📋
            </button>
            <span
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            >
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-5 text-sm text-white">
          {/* Length Slider */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="len" className="font-medium">
              Password Length: <span className="text-orange-400 font-semibold">{length}</span>
            </label>
            <input
              type="range"
              id="len"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full sm:w-1/2 accent-orange-500"
            />
          </div>

          {/* Number Toggle */}
          <div className="flex justify-between items-center">
            <label htmlFor="numInp" className="font-medium">Include Numbers</label>
            <input
              type="checkbox"
              id="numInp"
              checked={numallowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              className="w-5 h-5 accent-orange-400"
            />
          </div>

          {/* Special Character Toggle */}
          <div className="flex justify-between items-center">
            <label htmlFor="charInp" className="font-medium">Include Special Characters</label>
            <input
              type="checkbox"
              id="charInp"
              checked={charallowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-5 h-5 accent-orange-400"
            />
          </div>
        </div>
      </div>
    </div>
  );



}