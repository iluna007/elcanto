const icons = {
  drag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="7" y="3" width="10" height="16" rx="5" />
      <path d="M12 6v3" strokeLinecap="round" />
      <path d="M4 12h3M17 12h3M12 17v3" strokeLinecap="round" />
      <path d="M6.5 9.5L4 12l2.5 2.5M17.5 9.5L20 12l-2.5 2.5M9.5 6.5L12 4l2.5 2.5M9.5 17.5L12 20l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wheel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 5h8a3 3 0 013 3v8a3 3 0 01-3 3H8a3 3 0 01-3-3V8a3 3 0 013-3z" />
      <rect x="10.5" y="8" width="3" height="5" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
      <path d="M11.25 9.5v.5M12.75 9.5v.5M11.25 11v.5M12.75 11v.5" strokeLinecap="round" strokeWidth="1" />
      <path d="M12 3v2M12 19v2" strokeLinecap="round" />
      <path d="M10 3.5l1 1.5M14 3.5l-1 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20.5l1-1.5M14 20.5l-1-1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  trackpad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="7" width="16" height="11" rx="2.5" />
      <circle cx="9.5" cy="12.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12.5" r="1.25" fill="currentColor" stroke="none" />
      <path d="M6 5l-1.5-1.5M18 5l1.5-1.5M6 20l-1.5 1.5M18 20l1.5 1.5" strokeLinecap="round" />
      <path d="M3.5 8.5l1.5 1M20.5 8.5l-1.5 1M3.5 15.5l1.5-1M20.5 15.5l-1.5-1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  ),
  rotate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 16l3-8h10l3 8" strokeLinejoin="round" />
      <path d="M6 16h12" strokeLinecap="round" />
      <path d="M8 20h8" strokeLinecap="round" opacity="0.5" />
      <path d="M12 8v-2M9 6l3-2 3 2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="15" y="6" fontSize="4" fill="currentColor" stroke="none" fontFamily="system-ui,sans-serif">Ctrl</text>
    </svg>
  ),
  click: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="14" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
      <path d="M14 4l1.5 6 2.5-2 3.5 6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="4" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  ),
  legend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="5" width="6" height="4" rx="1" fill="currentColor" opacity="0.35" stroke="none" />
      <rect x="4" y="11" width="6" height="4" rx="1" fill="currentColor" opacity="0.55" stroke="none" />
      <rect x="4" y="17" width="6" height="4" rx="1" fill="currentColor" opacity="0.75" stroke="none" />
      <path d="M13 7h7M13 13h7M13 19h7" strokeLinecap="round" />
    </svg>
  ),
}

function MapHelpIcon({ name }) {
  return <span className="map-help__icon">{icons[name] ?? icons.legend}</span>
}

export default MapHelpIcon
