"use client";

import React from 'react';
import styled from 'styled-components';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const AnimatedButton = ({ children, onClick, className }: AnimatedButtonProps) => {
  return (
    <StyledWrapper>
      <button className={`styled-button ${className || ''}`} onClick={onClick}>
        <span className="gradient-bg"></span>
        <span className="button-content">
          {children}
          <div className="inner-button">
            <svg id="Arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" className="icon">
              <defs>
                <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
                  <stop style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} offset="0%" />
                  <stop style={{ stopColor: '#AAAAAA', stopOpacity: 1 }} offset="100%" />
                </linearGradient>
              </defs>
              <path fill="url(#iconGradient)" d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z" />
            </svg>
          </div>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .styled-button {
    position: relative;
    padding: 4px;
    font-size: 0.9rem;
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(90deg, #ff3f6c, #ff905a, #ff3f6c, #ff905a);
    background-size: 300% 100%;
    animation: gradient-shift 3s ease infinite;
    border-radius: 9999px;
    cursor: pointer;
    border: none;
    overflow: hidden;
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .styled-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 63, 108, 0.5);
  }

  .button-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #171717, #242424);
    border-radius: 9999px;
    padding: 0.75rem 1.5rem;
    position: relative;
    z-index: 1;
  }

  .styled-button:active {
    transform: translateY(2px) scale(1.02);
  }

  .inner-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #171717, #242424);
    width: 32px;
    height: 32px;
    margin-left: 8px;
    border-radius: 50%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 1);
    border: 1px solid #252525;
    transition: all 0.2s ease;
  }

  .inner-button .icon {
    filter: drop-shadow(0 10px 20px rgba(26, 25, 25, 0.9))
      drop-shadow(0 0 4px rgba(0, 0, 0, 1));
    transition: all 0.4s ease-in-out;
  }

  .styled-button:hover .inner-button .icon {
    filter: drop-shadow(0 10px 20px rgba(50, 50, 50, 1))
      drop-shadow(0 0 20px rgba(2, 2, 2, 1));
    transform: rotate(-35deg);
  }
`;

export default AnimatedButton;
