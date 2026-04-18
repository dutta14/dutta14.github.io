interface Props { className?: string }

const MetaLogo = ({ className }: Props) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,16 C8,10 14,6 16,16 C18,26 24,22 24,16 C24,10 18,6 16,16 C14,26 8,22 8,16 Z" />
  </svg>
);

export default MetaLogo;
