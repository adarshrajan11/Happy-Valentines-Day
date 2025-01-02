import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import love from "../assets/icons/Vector.svg";
import btnlove from "../assets/icons/love.svg";

const LoveMeter = () => {
    const [name, setName] = useState("");
    const [percentage, setPercentage] = useState(0);

    const liquidRef = useRef(null);

    const calculateLovePercentage = (input) => {
        if (!input) return 0;
        const totalAscii = input.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return totalAscii % 101; // Return percentage between 0 and 100
    };

    const handleClick = (event) => {
        event.preventDefault();
        const calculatedPercentage = calculateLovePercentage(name);
        setPercentage(calculatedPercentage);
    };

    useEffect(() => {
        const waveHeight = 177 - (percentage / 100) * 177;

        // Animate to the target percentage
        gsap.to(liquidRef.current, {
            attr: {
                d: `M0,${waveHeight} 
            Q50,${waveHeight + 20},100,${waveHeight} 
            T200,${waveHeight} 
            V177 H0 Z`,
            },
            duration: 2,
            ease: "power1.inOut",
        });
    }, [percentage]);

    return (
        <div className="love-meter-container">
            <div className="input-container">
                <label htmlFor="name">YOUR CRUSH</label>
                <input
                    className="love-input"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div className="svg-container">
                <h3>LOVE METER</h3>
                <svg
                    filter="url(#filter0_i_101_2)"
                    width="200"
                    height="177"
                    viewBox="0 0 200 177"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color-interpolation-filters="sRGB"
                >

                    <defs>
                        <clipPath id="heartClip">
                            <path d="M113.492 171.241C105.895 178.138 94.1995 178.138 86.6024 171.141L85.5028 170.141C33.023 122.659 -1.2638 91.5713 0.0356968 52.7862C0.635466 35.7928 9.33212 19.499 23.4267 9.90273C49.8166 -8.09035 82.404 0.306423 99.9973 20.8985C117.591 0.306423 150.178 -8.19031 176.568 9.90273C190.662 19.499 199.359 35.7928 199.959 52.7862C201.358 91.5713 166.972 122.659 114.492 170.341L113.492 171.241Z" />
                        </clipPath>
                    </defs>
                    <g clipPath="url(#heartClip)">
                        <path
                            ref={liquidRef}
                            d={`M0,177 
              Q50,197,100,177 
              T200,177 
              V177 H0 Z`}
                            fill="rgba(255, 17, 150, 1)"
                        />
                    </g>
                    <path
                        d="M113.492 171.241C105.895 178.138 94.1995 178.138 86.6024 171.141L85.5028 170.141C33.023 122.659 -1.2638 91.5713 0.0356968 52.7862C0.635466 35.7928 9.33212 19.499 23.4267 9.90273C49.8166 -8.09035 82.404 0.306423 99.9973 20.8985C117.591 0.306423 150.178 -8.19031 176.568 9.90273C190.662 19.499 199.359 35.7928 199.959 52.7862C201.358 91.5713 166.972 122.659 114.492 170.341L113.492 171.241Z"
                        fill="white"
                        fillOpacity="0.2"
                    />
                </svg>
            </div>
            <div className="slider-container">
                <label htmlFor="love-slider">{percentage}%</label>
                <input
                    type="range"
                    id="love-slider"
                    min="0"
                    max="100"
                    value={percentage} // Bind slider value to percentage
                    readOnly // Make slider non-interactive
                    style={{
                        appearance: "none",
                        width: "100%",
                        height: "8px",
                        // background: "linear-gradient(to right, #ff1196, #ffd1e8)",
                        background: `linear-gradient(to right, #ff1196 ${percentage}%,rgba(255, 255, 255, 1) ${percentage}%)`,
                        borderRadius: "5px",
                        outline: "none",
                        opacity: 0.9,
                        marginTop: "10px",
                        pointerEvents: 'auto', // Prevent user interaction
                    }}
                />

            </div>
            <button onClick={handleClick} className="love-button">
                SUBMIT
                <img src={btnlove} alt="" />
            </button>
            {/* {percentage > 0 && (
                <p className="love-percentage">Love Percentage: {percentage}%</p>
            )} */}
            <style jsx>{`
    #love-slider::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff1196; /* Customize the color here */
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Optional shadow for a 3D effect */
    }

    #love-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff1196; /* Customize the color here */
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Optional shadow for a 3D effect */
    }
`}</style>
        </div>

    );
};

export default LoveMeter;
