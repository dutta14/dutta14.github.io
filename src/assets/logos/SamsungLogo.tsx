interface Props { className?: string }

const SamsungLogo = ({ className }: Props) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="16" cy="16" rx="14" ry="10" transform="rotate(-10 16 16)" />
  </svg>
);

export default SamsungLogo;
