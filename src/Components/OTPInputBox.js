import React, { useState, useRef } from "react";

function OTPInputBox({ onChange }) {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    onChange(otp.join(""));
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 4)
      .split("");
    setOTP(pastedData.concat(["", "", "", ""]).slice(0, 4));
    inputRefs[0].current.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="otp-input-box">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          ref={inputRefs[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

export default OTPInputBox;
