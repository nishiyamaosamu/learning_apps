/**
 * 見出し・ラベル用のミニアイコン（DESIGN.html の Material Symbols 相当）
 * stroke: currentColor なので、親要素の color で着色する。
 */

type IconProps = { size?: number };

const Svg: React.FC<IconProps & { children: React.ReactNode }> = ({ size = 48, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    style={{ flex: "none", display: "block" }}
  >
    {children}
  </svg>
);

export const IcShieldAlert: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    <path d="M12 8.5v4" />
    <path d="M12 16h.01" />
  </Svg>
);

export const IcLock: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
);

export const IcKey: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <circle cx="7.5" cy="15.5" r="4" />
    <path d="M10.5 12.5L20 3" />
    <path d="M16 4l3 3" />
  </Svg>
);

export const IcGlobe: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c3 3.5 3 14.5 0 18" />
    <path d="M12 3c-3 3.5-3 14.5 0 18" />
  </Svg>
);

export const IcCalc: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7.5h6" />
    <path d="M9 12h.01M12 12h.01M15 12h.01M9 16.5h.01M12 16.5h.01M15 16.5h.01" />
  </Svg>
);

export const IcLayers: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 12l10 5 10-5" />
    <path d="M2 17l10 5 10-5" />
  </Svg>
);

export const IcDns: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </Svg>
);

export const IcThumbUp: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3z" />
    <path d="M7 10l4.2-6.6a2.4 2.4 0 0 1 2.3 2.4V9h5a2 2 0 0 1 2 2.3l-1.1 7A2 2 0 0 1 17.4 20H7" />
  </Svg>
);

export const IcThumbDown: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <g transform="rotate(180 12 12)">
      <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3z" />
      <path d="M7 10l4.2-6.6a2.4 2.4 0 0 1 2.3 2.4V9h5a2 2 0 0 1 2 2.3l-1.1 7A2 2 0 0 1 17.4 20H7" />
    </g>
  </Svg>
);

export const IcTrendUp: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Svg>
);

export const IcWarning: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 3.5L22 20H2L12 3.5z" />
    <path d="M12 9.5v4.5" />
    <path d="M12 17.5h.01" />
  </Svg>
);

export const IcRouter: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 16.5h.01M11 16.5h.01" />
    <path d="M17 13V6" />
    <path d="M13.5 8.5A5 5 0 0 1 17 7a5 5 0 0 1 3.5 1.5" />
  </Svg>
);

export const IcCable: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M9 3v4M15 3v4" />
    <rect x="7" y="7" width="10" height="6" rx="1" />
    <path d="M12 13v8" />
  </Svg>
);
