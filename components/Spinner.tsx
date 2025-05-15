import React from 'react';

type SpinnerWaveProps = { message: string };
const SpinnerWave = ({ message }: SpinnerWaveProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-3 h-8 bg-purple-600 rounded-full animate-pulse"
            style={{
              animation: `pulseDelay 1.2s ease-in-out ${
                index * 0.15
              }s infinite`,
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-gray-600">{message}</p>

      <style jsx>{`
        @keyframes pulseDelay {
          0%,
          40%,
          100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SpinnerWave;
