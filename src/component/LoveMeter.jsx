import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import btnlove from "../assets/icons/love.svg";

const LoveMeter = () => {
    const [name, setName] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const liquidRef = useRef(null);
    const heartRef = useRef(null);
    const waveHeightRef = useRef(177); // Start with empty

    const calculateLovePercentage = (input) => {
        if (!input) return 0;
        const totalAscii = input.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        setPercentage(totalAscii % 101);
        console.log(totalAscii % 101);
        return totalAscii % 101;
    };

    const handleClick = (event) => {
        event.preventDefault();
        if (isAnimating) return;

        const calculatedPercentage = calculateLovePercentage(name);
        setIsAnimating(true);

        // Animate the percentage change smoothly
        gsap.to(waveHeightRef, {
            current: calculatedPercentage,
            duration: 2,
            onUpdate: updateLiquid,
            onComplete: () => setIsAnimating(false)
        });
    };

    const updateLiquid = () => {
        const currentPercentage = waveHeightRef.current;
        const waveHeight = 177 - (currentPercentage / 100) * 177;

        // Create a more organic wave pattern with multiple control points
        const d = `
            M0,${waveHeight} 
            C30,${waveHeight + 10} 70,${waveHeight - 15} 100,${waveHeight}
            S170,${waveHeight + 20} 200,${waveHeight}
            V177 H0 Z
        `;

        liquidRef.current.setAttribute("d", d);
    };

    // Initial animation when component mounts
    useEffect(() => {
        gsap.from(heartRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        });

        // Add subtle continuous wave animation
        const waveAnimation = () => {
            if (!isAnimating) {
                gsap.to(liquidRef.current, {
                    attr: {
                        d: `
                            M0,${177 - (percentage / 100) * 177} 
                            C30,${177 - (percentage / 100) * 177 + 5} 70,${177 - (percentage / 100) * 177 - 10} 100,${177 - (percentage / 100) * 177}
                            S170,${177 - (percentage / 100) * 177 + 10} 200,${177 - (percentage / 100) * 177}
                            V177 H0 Z
                        `
                    },
                    duration: 4,
                    ease: "none"
                });
            }
        };

        const waveInterval = setInterval(waveAnimation, 4000);
        return () => clearInterval(waveInterval);
    }, [percentage, isAnimating]);

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
                    ref={heartRef}
                    width="200"
                    height="177"
                    viewBox="0 0 200 177"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="heartClip">
                            <path d="M113.492 171.241C105.895 178.138 94.1995 178.138 86.6024 171.141L85.5028 170.141C33.023 122.659 -1.2638 91.5713 0.0356968 52.7862C0.635466 35.7928 9.33212 19.499 23.4267 9.90273C49.8166 -8.09035 82.404 0.306423 99.9973 20.8985C117.591 0.306423 150.178 -8.19031 176.568 9.90273C190.662 19.499 199.359 35.7928 199.959 52.7862C201.358 91.5713 166.972 122.659 114.492 170.341L113.492 171.241Z" />
                        </clipPath>
                        <filter id="liquidFilter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    <g clipPath="url(#heartClip)">
                        <path
                            ref={liquidRef}
                            d={`M0,177 Q50,197,100,177 T200,177 V177 H0 Z`}
                            fill="url(#liquidGradient)"
                            filter="url(#liquidFilter)"
                        />
                        <defs>
                            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ff1196" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#ff5599" stopOpacity="0.7" />
                            </linearGradient>
                        </defs>
                    </g>

                    <path
                        d="M113.492 171.241C105.895 178.138 94.1995 178.138 86.6024 171.141L85.5028 170.141C33.023 122.659 -1.2638 91.5713 0.0356968 52.7862C0.635466 35.7928 9.33212 19.499 23.4267 9.90273C49.8166 -8.09035 82.404 0.306423 99.9973 20.8985C117.591 0.306423 150.178 -8.19031 176.568 9.90273C190.662 19.499 199.359 35.7928 199.959 52.7862C201.358 91.5713 166.972 122.659 114.492 170.341L113.492 171.241Z"
                        fill="white"
                        fillOpacity="0.2"
                        stroke="#ff5599"
                        strokeWidth="1"
                    />
                </svg>

                {/* Bubbles for extra effect */}
                {percentage > 0 && (
                    <div className="bubbles">
                        {[...Array(Math.floor(percentage / 10))].map((_, i) => (
                            <div
                                key={i}
                                className="bubble"
                                style={{
                                    left: `${10 + (i * 15) % 80}%`,
                                    bottom: `${10 + (i * 5) % 30}%`,
                                    width: `${3 + (i % 3)}px`,
                                    height: `${3 + (i % 3)}px`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="slider-container">
                <label htmlFor="love-slider">{Math.round(percentage)}%</label>
                <input
                    type="range"
                    id="love-slider"
                    min="0"
                    max="100"
                    value={percentage}
                    readOnly
                    style={{
                        background: `linear-gradient(to right, #ff1196 ${percentage}%, rgba(255, 255, 255, 0.3) ${percentage}%)`,
                    }}
                />
            </div>

            <button
                onClick={handleClick}
                className="love-button"
                disabled={isAnimating}
            >
                {isAnimating ? "CALCULATING..." : "SUBMIT"}
                <img src={btnlove} alt="" />
            </button>

            <style jsx>{`
                .bubbles {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }
                
                .bubble {
                    position: absolute;
                    background-color: rgba(113, 33, 33, 0.6);
                    border-radius: 50%;
                    animation: float-up 3s infinite ease-in;
                }
                
                @keyframes float-up {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(-100px);
                        opacity: 0;
                    }
                }
                
                #love-slider::-webkit-slider-thumb {
                    width: 20px;
                    height: 20px;
                    background:rgb(42, 27, 36);
                    box-shadow: 0 0 5px rgba(255, 17, 150, 0.8);
                    transition: all 0.3s ease;
                }
                
                #love-slider::-webkit-slider-thumb:hover {S
                    transform: scale(1.1);
                    box-shadow: 0 0 10px rgb(220, 65, 13);
                }
                
                .love-button:disabled {
                    opacity: 0.7;
                    transform: none !important;
                }
                
                .love-button:disabled img {
                    animation: pulse 0.8s infinite;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default LoveMeter;