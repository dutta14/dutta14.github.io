interface Props { className?: string }

const MicrosoftLogo = ({ className }: Props) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="13" height="13" rx="1" />
    <rect x="17" y="2" width="13" height="13" rx="1" />
    <rect x="2" y="17" width="13" height="13" rx="1" />
    <rect x="17" y="17" width="13" height="13" rx="1" />
  </svg>
);

export default MicrosoftLogo;
