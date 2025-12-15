export function CoffeeDecorations() {
  return (
    <>
      {/* Left side - floating coffee beans */}
      <div className="coffee-beans-decoration" aria-hidden="true">
        <svg
          width="60"
          height="300"
          viewBox="0 0 60 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bean 1 - top */}
          <g className="bean" style={{ opacity: 0.35 }}>
            <ellipse cx="30" cy="40" rx="12" ry="18" fill="#6B5B50" />
            <path
              d="M30 22 Q28 40 30 58"
              stroke="#4A3C35"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Bean 2 - upper middle */}
          <g className="bean" style={{ opacity: 0.3, transform: 'translateX(10px)' }}>
            <ellipse cx="25" cy="110" rx="10" ry="15" fill="#6B5B50" />
            <path
              d="M25 95 Q23 110 25 125"
              stroke="#4A3C35"
              strokeWidth="1.5"
              fill="none"
            />
          </g>

          {/* Bean 3 - middle */}
          <g className="bean" style={{ opacity: 0.38 }}>
            <ellipse cx="35" cy="180" rx="11" ry="16" fill="#6B5B50" />
            <path
              d="M35 164 Q33 180 35 196"
              stroke="#4A3C35"
              strokeWidth="1.5"
              fill="none"
            />
          </g>

          {/* Bean 4 - bottom */}
          <g className="bean" style={{ opacity: 0.28, transform: 'translateX(-5px)' }}>
            <ellipse cx="28" cy="260" rx="9" ry="14" fill="#6B5B50" />
            <path
              d="M28 246 Q26 260 28 274"
              stroke="#4A3C35"
              strokeWidth="1.5"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* Right side - coffee mug with steam */}
      <div className="coffee-mug-decoration" aria-hidden="true">
        <svg
          width="80"
          height="140"
          viewBox="0 0 80 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Steam wisps */}
          <g style={{ transform: 'translateY(0)' }}>
            <path
              className="steam-wisp"
              d="M25 50 Q20 35 25 20 Q30 5 25 -10"
              stroke="#A89080"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ opacity: 0.25 }}
            />
            <path
              className="steam-wisp"
              d="M40 50 Q45 30 40 15 Q35 0 40 -15"
              stroke="#A89080"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ opacity: 0.2 }}
            />
            <path
              className="steam-wisp"
              d="M55 50 Q50 38 55 25 Q60 12 55 -5"
              stroke="#A89080"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ opacity: 0.25 }}
            />
          </g>

          {/* Mug body */}
          <g style={{ opacity: 0.28 }}>
            {/* Main cup shape */}
            <path
              d="M10 55 L10 115 Q10 130 25 130 L55 130 Q70 130 70 115 L70 55 Z"
              fill="#4A3C35"
            />
            {/* Handle */}
            <path
              d="M70 65 Q85 65 85 85 Q85 105 70 105"
              stroke="#4A3C35"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Coffee surface */}
            <ellipse cx="40" cy="55" rx="30" ry="6" fill="#2D1F1B" />
          </g>
        </svg>
      </div>
    </>
  );
}
