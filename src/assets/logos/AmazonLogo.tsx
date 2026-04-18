interface Props { className?: string }

const AmazonLogo = ({ className }: Props) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="14" r="6" />
    <line x1="20" y1="8" x2="20" y2="20" />
    <path d="M8,22 Q16,28 26,22" />
    <polyline points="23,20 26,22 23,24" />
  </svg>
);

export default AmazonLogo;
