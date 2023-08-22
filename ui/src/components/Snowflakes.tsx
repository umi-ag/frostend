import React from 'react';

const snowflakeChars = ['❅', '❆', '❅', '❆', '❅', '❆', '❅', '❆', '❅', '❆', '❅', '❆'];

const numberOfSnowflakes = 20;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;



export const Snowflakes = () => {
  return (
    <div className="snowflakes" aria-hidden="true">
      {Array.from({ length: numberOfSnowflakes }).map((_, index) => (
        <div
          key={index}
          className={`snowflake`}
          style={{
            left: `${randomBetween(0, 100)}%`,
            top: `${randomBetween(-20, -10)}%`,
            animationDelay: `${randomBetween(0, 15)}s, ${randomBetween(0, 3)}s`,  // この行を修正
            animationDuration: `${randomBetween(15, 30)}s, ${randomBetween(2, 4)}s`,  // この行を修正
            animationIterationCount: 'infinite',
            fontSize: `${randomBetween(0.05, 0.5)}em`,
            textShadow: 'none',
            zIndex: -5,
          }}
        >
          {snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)]}
        </div>
      ))}
    </div>
  );
};

