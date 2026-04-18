interface Props { className?: string }

const USCLogo = ({ className }: Props) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14,8 C8,8 6,11 6,13 C6,15 8,17 14,17 C20,17 14,19 14,19 C8,21 6,19 6,21 C6,23 8,25 14,25" />
    <path d="M26,10 C24,8 20,7 18,8 C14,10 14,14 18,16 C22,18 22,22 18,24 C16,25 14,24 12,23" />
  </svg>
);

export default USCLogo;
