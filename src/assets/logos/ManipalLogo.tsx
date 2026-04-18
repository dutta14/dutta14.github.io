interface Props { className?: string }

const ManipalLogo = ({ className }: Props) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="14" />
    <path d="M8,24 L8,10 L16,18 L24,10 L24,24" />
  </svg>
);

export default ManipalLogo;
