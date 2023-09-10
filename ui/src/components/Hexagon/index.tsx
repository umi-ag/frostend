import React from 'react';

export const Hexagon: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  return (
    <div className="hexagon">
      <div className="hexagon-inner">
        {children}
      </div>
      <style jsx>{`
        .hexagon {
          width: 100px;
          height: 58px;
          background-color: #4A90E2;
          margin-top: 29px;
          position: relative;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .hexagon-inner {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          color: white;
        }
      `}</style>
    </div>
  );
};
