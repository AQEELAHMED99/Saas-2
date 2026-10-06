import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 118,
  strokeWidth = 9,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // clamp between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Determine colors based on Lighthouse standards:
  // 90-100: Good (Green / Emerald)
  // 50-89: Needs Improvement (Orange / Amber)
  // 0-49: Poor (Red)
  let strokeColor = '#059669'; // Emerald-600
  let textColor = 'text-emerald-600';
  let bgColor = 'rgba(16, 185, 129, 0.08)';

  if (normalizedScore < 50) {
    strokeColor = '#ef4444'; // Red-500
    textColor = 'text-red-500';
    bgColor = 'rgba(239, 68, 68, 0.08)';
  } else if (normalizedScore < 90) {
    strokeColor = '#f59e0b'; // Amber-500
    textColor = 'text-amber-500';
    bgColor = 'rgba(245, 158, 11, 0.08)';
  } else {
    // 90-100 matches exact screenshot teal/emerald ring
    strokeColor = '#059669';
    textColor = 'text-emerald-600';
    bgColor = 'rgba(5, 150, 105, 0.06)';
  }

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill={bgColor}
          className="gauge-circle"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      {/* Center Score Number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
          {normalizedScore}
        </span>
      </div>
    </div>
  );
};
