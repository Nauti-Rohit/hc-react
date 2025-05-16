import { useState, useCallback, useEffect, useRef } from "react";
// import "App.css"


export default function Passwordgenrator() {

  //useState hook
  const [length, setLength] = useState(8);
  const [numallowed, setNumAllowed] = useState(false);
  const [charallowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

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


  const copyPwdToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,);
    window.navigator.clipboard.writeText(password);
  }, [password])


  //useEffect hook
  useEffect(() => {
    pwdGenrator();
  }, [length, numallowed, charallowed, pwdGenrator])




  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>

      <h1 className=' text-center text-white my-3'> Password Genrator </h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPwdToClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">

          <input type="range"
            min={8}
            max={32}
            value={length}
            id="len"
            className="cursor-pointer"
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label htmlFor="len" >Length: {length}</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={numallowed}
            id="numInp"
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="numInp">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={charallowed}
            id="charInp"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="charInp">Special Character</label>
        </div>

      </div>

    </div>
  );
}