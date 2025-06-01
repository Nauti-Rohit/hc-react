import { useState, useCallback, useEffect, useRef } from "react";

export default function Passwordgenrator() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumAllowed] = useState(false);
  const [charallowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const pwdGenrator = useCallback(() => {
    let pass = [];
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const specials = "$%&'()+,-./:;<=>?@[]^_`{|}~";
    let allChars = str;

    if (numallowed) {
      pass.push(digits[Math.floor(Math.random() * digits.length)]);
      allChars += digits;
    }

    if (charallowed) {
      pass.push(specials[Math.floor(Math.random() * specials.length)]);
      allChars += specials;
    }

    const remainingLength = length - pass.length;
    for (let i = 0; i < remainingLength; i++) {
      pass.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    for (let i = pass.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pass[i], pass[j]] = [pass[j], pass[i]];
    }

    setPassword(pass.join(""));
  }, [length, numallowed, charallowed]);

  const copyPwdToClipBoard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard
        .writeText(password)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  }, [password]);

  useEffect(() => {
    pwdGenrator();
  }, [length, numallowed, charallowed, pwdGenrator]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 p-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">🔐 Password Generator</h1>

        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full px-4 py-3 text-lg text-black rounded-lg outline-none bg-white shadow-inner"
            placeholder="Your secure password"
          />
          <button
            onClick={copyPwdToClipBoard}
            className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-all"
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium">
              Password Length: <span className="text-orange-400 font-semibold">{length}</span>
            </label>
            <input
              id="length"
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-1/2 accent-orange-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numInp" className="font-medium">Include Numbers</label>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="numInp"
                checked={numallowed}
                onChange={() => setNumAllowed((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:left-[4px] after:top-[3px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="charInp" className="font-medium">Include Special Characters</label>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="charInp"
                checked={charallowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-pink-500 after:content-[''] after:absolute after:left-[4px] after:top-[3px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
