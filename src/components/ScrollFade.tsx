import '../styles/ScrollFade.css';

interface ScrollFadeProps {
  atTop: boolean;
  atBottom: boolean;
}

const ScrollFade = ({ atTop, atBottom }: ScrollFadeProps) => (
  <>
    <div
      className={`scroll-fade scroll-fade-top${atTop ? '' : ' show'}`}
      data-testid="scroll-fade-top"
      aria-hidden="true"
    />
    <div
      className={`scroll-fade scroll-fade-bottom${atBottom ? '' : ' show'}`}
      data-testid="scroll-fade-bottom"
      aria-hidden="true"
    />
  </>
);

export default ScrollFade;
