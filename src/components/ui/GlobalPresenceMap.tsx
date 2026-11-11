import {
  worldBackgroundPath,
  kenyaPath,
  usaPath,
  chinaPath,
  southAfricaPath,
  eastAfricaPath,
} from './map-paths';

interface DestinationNode {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const nairobiHQ = {
  name: 'Nairobi',
  subtitle: 'MIXON HQ',
  x: 722.7,
  y: 306.3,
};

const keyNodes: DestinationNode[] = [
  { id: 'us-west', name: 'San Francisco', region: 'US West', x: 192.0, y: 159.0, labelPosition: 'left' },
  { id: 'us-east', name: 'New York', region: 'United States', x: 353.3, y: 148.1, labelPosition: 'top' },
  { id: 'europe', name: 'London', region: 'Europe', x: 599.7, y: 107.4, labelPosition: 'top' },
  { id: 'uganda', name: 'Kampala', region: 'East Africa', x: 708.7, y: 300.3, labelPosition: 'left' },
  { id: 'tanzania', name: 'Dar es Salaam', region: 'East Africa', x: 731.0, y: 327.1, labelPosition: 'right' },
  { id: 'rwanda', name: 'Kigali', region: 'East Africa', x: 700.3, y: 308.6, labelPosition: 'bottom' },
  { id: 'sa', name: 'Johannesburg', region: 'South Africa', x: 693.3, y: 400.2, labelPosition: 'bottom' },
  { id: 'china', name: 'Shanghai', region: 'China (APAC)', x: 1005.0, y: 183.9, labelPosition: 'right' },
];

const connectionCurves = [
  // Nairobi to US East
  'M 722.7 306.3 Q 538 55 353.3 148.1',
  // Nairobi to US West
  'M 722.7 306.3 Q 440 25 192.0 159.0',
  // Nairobi to China (Shanghai)
  'M 722.7 306.3 Q 864 90 1005.0 183.9',
  // Nairobi to South Africa
  'M 722.7 306.3 Q 730 360 693.3 400.2',
  // Nairobi to Europe
  'M 722.7 306.3 Q 660 180 599.7 107.4',
  // East Africa Mesh
  'M 722.7 306.3 Q 716 300 708.7 300.3',
  'M 722.7 306.3 Q 728 318 731.0 327.1',
  'M 722.7 306.3 Q 710 306 700.3 308.6',
];

/**
 * GlobalPresenceMap:
 * Accurate world geography with Kenya prominently highlighted as the central beacon
 * and strategic partner corridors in the United States, East Africa (Uganda, Tanzania, Rwanda),
 * South Africa, and China connected by radiant arcs.
 */
export default function GlobalPresenceMap() {
  return (
    <div className="relative mx-auto h-full w-full max-w-[1500px]" aria-hidden="true">
      <svg
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full select-none"
      >
        <defs>
          {/* Background Landmass Gradient */}
          <linearGradient id="world-land-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f8fe" />
            <stop offset="100%" stopColor="#e3eeff" />
          </linearGradient>

          {/* Highlighted Partner Countries Gradient */}
          <linearGradient id="partner-country-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.32" />
          </linearGradient>

          {/* Kenya Beacon Fill */}
          <linearGradient id="kenya-beacon-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#004cd4" stopOpacity="0.88" />
          </linearGradient>

          {/* Radiant Connection Stream */}
          <linearGradient id="connection-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0.25" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="beacon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* 1. Subtle Geodetic Grid Lines (Lat / Long) */}
        <g stroke="#0066ff" strokeOpacity="0.07" strokeWidth="0.8" strokeDasharray="3 4">
          <line x1="0" y1="130" x2="1200" y2="130" />
          <line x1="0" y1="260" x2="1200" y2="260" />
          <line x1="0" y1="390" x2="1200" y2="390" />
          <line x1="200" y1="0" x2="200" y2="520" />
          <line x1="400" y1="0" x2="400" y2="520" />
          <line x1="600" y1="0" x2="600" y2="520" />
          <line x1="800" y1="0" x2="800" y2="520" />
          <line x1="1000" y1="0" x2="1000" y2="520" />
        </g>

        {/* 2. Base World Continents */}
        <path
          d={worldBackgroundPath}
          fill="url(#world-land-bg)"
          stroke="#b8d5ff"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* 3. Highlighted Partner Countries: US, East Africa, South Africa, China */}
        {/* United States */}
        <path
          d={usaPath}
          fill="url(#partner-country-fill)"
          stroke="#0066ff"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />

        {/* China */}
        <path
          d={chinaPath}
          fill="url(#partner-country-fill)"
          stroke="#0066ff"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* South Africa */}
        <path
          d={southAfricaPath}
          fill="url(#partner-country-fill)"
          stroke="#0066ff"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* East Africa (Uganda, Tanzania, Rwanda) */}
        <path
          d={eastAfricaPath}
          fill="url(#partner-country-fill)"
          stroke="#0066ff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* 4. Highlighted Core Beacon Country: KENYA */}
        <path
          d={kenyaPath}
          fill="url(#kenya-beacon-fill)"
          stroke="#0066ff"
          strokeWidth="2.2"
          strokeLinejoin="round"
          filter="url(#beacon-glow)"
        />

        {/* 5. Radiant Connection Arcs */}
        <g fill="none" strokeLinecap="round">
          {/* Base ambient track */}
          {connectionCurves.map((curve, idx) => (
            <path
              key={`base-${idx}`}
              d={curve}
              stroke="#0066ff"
              strokeOpacity="0.18"
              strokeWidth="2.8"
            />
          ))}

          {/* Active luminous pulse track */}
          {connectionCurves.map((curve, idx) => (
            <path
              key={`pulse-${idx}`}
              d={curve}
              stroke="url(#connection-gradient)"
              strokeWidth="1.8"
              strokeDasharray="7 5"
              className="animate-pulse"
            />
          ))}
        </g>

        {/* 6. Partner Destination Nodes */}
        {keyNodes.map((node) => (
          <g key={node.id} className="transition-transform duration-200">
            {/* Soft outer glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="#0066ff"
              opacity="0.18"
              filter="url(#soft-glow)"
            />
            {/* Inner dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r="3.4"
              fill="#ffffff"
              stroke="#0066ff"
              strokeWidth="1.8"
            />
            {/* Micro label */}
            <text
              x={node.x + (node.labelPosition === 'left' ? -8 : 8)}
              y={node.y + (node.labelPosition === 'top' ? -8 : node.labelPosition === 'bottom' ? 14 : 3)}
              textAnchor={node.labelPosition === 'left' ? 'end' : 'start'}
              fill="#1e293b"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
              className="pointer-events-none select-none drop-shadow-sm"
            >
              {node.region}
            </text>
          </g>
        ))}

        {/* 7. Central Radiant Beacon: NAIROBI (MIXON HQ) */}
        <g className="beacon-hq">
          {/* Expanding animated pulse rings */}
          <circle
            cx={nairobiHQ.x}
            cy={nairobiHQ.y}
            r="32"
            fill="#0066ff"
            opacity="0.08"
            className="animate-ping"
            style={{ animationDuration: '3s', transformOrigin: `${nairobiHQ.x}px ${nairobiHQ.y}px` }}
          />
          <circle
            cx={nairobiHQ.x}
            cy={nairobiHQ.y}
            r="20"
            fill="#0066ff"
            opacity="0.15"
          />
          <circle
            cx={nairobiHQ.x}
            cy={nairobiHQ.y}
            r="11"
            fill="#0066ff"
            opacity="0.28"
          />
          {/* Center core point */}
          <circle
            cx={nairobiHQ.x}
            cy={nairobiHQ.y}
            r="5.5"
            fill="#0066ff"
            stroke="#ffffff"
            strokeWidth="2.2"
            filter="url(#beacon-glow)"
          />

          {/* High-craft HQ Label Card */}
          <g transform={`translate(${nairobiHQ.x + 14}, ${nairobiHQ.y - 18})`}>
            {/* Pill Container */}
            <rect
              x="0"
              y="0"
              width="106"
              height="36"
              rx="6"
              fill="#ffffff"
              stroke="#0066ff"
              strokeWidth="1.2"
              filter="drop-shadow(0 4px 12px rgba(0, 102, 255, 0.18))"
            />
            {/* Active Green Ping Indicator */}
            <circle cx="12" cy="18" r="3.5" fill="#10b981" />
            <circle cx="12" cy="18" r="5.5" fill="#10b981" opacity="0.35" className="animate-pulse" />
            
            {/* Nairobi Title */}
            <text
              x="22"
              y="16"
              fill="#0f172a"
              fontSize="11.5"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
            >
              Nairobi
            </text>
            
            {/* MIXON HQ Badge */}
            <text
              x="22"
              y="28"
              fill="#0066ff"
              fontSize="8.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="700"
              letterSpacing="0.8"
            >
              MIXON HQ
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
