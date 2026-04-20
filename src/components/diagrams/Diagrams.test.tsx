import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import AlexaDiagram from './AlexaDiagram';
import VoiceAssistantDiagram from './VoiceAssistantDiagram';
import CopilotDiagram from './CopilotDiagram';
import CaseStudyPage from '../../pages/case-study/CaseStudyPage';

beforeAll(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver;
});

afterEach(() => {
  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((s) => s.remove());
});

const renderWithSlug = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/case-study/${slug}`]}>
      <Routes>
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
      </Routes>
    </MemoryRouter>,
  );

/* ── Helper: assert all <text> fills use CSS variables ── */
const assertCssVariableFills = (container: HTMLElement) => {
  const svg = container.querySelector('svg')!;
  const textEls = svg.querySelectorAll('text');
  expect(textEls.length).toBeGreaterThan(0);
  textEls.forEach((el) => {
    const fill = el.getAttribute('fill');
    expect(fill, `<text> "${el.textContent}" uses hardcoded fill "${fill}"`).toMatch(
      /^var\(--/,
    );
  });
};

/* ══════════════════════════════════════════════════════════
   AlexaDiagram
   ══════════════════════════════════════════════════════════ */

describe('AlexaDiagram', () => {
  it('renders an SVG with role="img" and aria-labelledby', () => {
    render(<AlexaDiagram />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-labelledby', 'diagram-alexa-title diagram-alexa-desc');
  });

  it('contains a <title> and <desc> element for accessibility', () => {
    const { container } = render(<AlexaDiagram />);
    const title = container.querySelector('title#diagram-alexa-title');
    expect(title).toBeInTheDocument();
    expect(title!.textContent).toMatch(/voice activation pipeline/i);
    const desc = container.querySelector('desc#diagram-alexa-desc');
    expect(desc).toBeInTheDocument();
    expect(desc!.textContent).toMatch(/DSP/i);
  });

  it('renders inside a <figure> with a <figcaption>', () => {
    const { container } = render(<AlexaDiagram />);
    const figure = container.querySelector('figure.diagram-wrap');
    expect(figure).toBeInTheDocument();
    const caption = figure!.querySelector('figcaption');
    expect(caption).toBeInTheDocument();
    expect(caption!.textContent).toMatch(/Fig 1/);
  });

  it('all SVG text elements use CSS variable fills', () => {
    const { container } = render(<AlexaDiagram />);
    assertCssVariableFills(container);
  });

  it('renders key node labels: DSP Engine, Audio Buffer, Cloud ASR', () => {
    render(<AlexaDiagram />);
    expect(screen.getByText('DSP Engine')).toBeInTheDocument();
    expect(screen.getByText('Audio Buffer')).toBeInTheDocument();
    expect(screen.getByText('Cloud ASR')).toBeInTheDocument();
  });
});

/* ══════════════════════════════════════════════════════════
   VoiceAssistantDiagram
   ══════════════════════════════════════════════════════════ */

describe('VoiceAssistantDiagram', () => {
  it('renders an SVG with role="img" and aria-labelledby', () => {
    render(<VoiceAssistantDiagram />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-labelledby', 'diagram-voice-title diagram-voice-desc');
  });

  it('contains a <title> and <desc> element for accessibility', () => {
    const { container } = render(<VoiceAssistantDiagram />);
    const title = container.querySelector('title#diagram-voice-title');
    expect(title).toBeInTheDocument();
    expect(title!.textContent).toMatch(/dialogue pipeline/i);
    const desc = container.querySelector('desc#diagram-voice-desc');
    expect(desc).toBeInTheDocument();
    expect(desc!.textContent).toMatch(/NLU Engine/i);
  });

  it('renders inside a <figure> with a <figcaption>', () => {
    const { container } = render(<VoiceAssistantDiagram />);
    const figure = container.querySelector('figure.diagram-wrap');
    expect(figure).toBeInTheDocument();
    const caption = figure!.querySelector('figcaption');
    expect(caption).toBeInTheDocument();
    expect(caption!.textContent).toMatch(/Fig 2/);
  });

  it('all SVG text elements use CSS variable fills', () => {
    const { container } = render(<VoiceAssistantDiagram />);
    assertCssVariableFills(container);
  });

  it('renders key node labels: Voice Input, NLU Engine, Dialogue State', () => {
    render(<VoiceAssistantDiagram />);
    expect(screen.getByText('Voice Input')).toBeInTheDocument();
    expect(screen.getByText('NLU Engine')).toBeInTheDocument();
    expect(screen.getByText('Dialogue State')).toBeInTheDocument();
  });
});

/* ══════════════════════════════════════════════════════════
   CopilotDiagram
   ══════════════════════════════════════════════════════════ */

describe('CopilotDiagram', () => {
  it('renders an SVG with role="img" and aria-labelledby', () => {
    render(<CopilotDiagram />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-labelledby', 'diagram-copilot-title diagram-copilot-desc');
  });

  it('contains a <title> and <desc> element for accessibility', () => {
    const { container } = render(<CopilotDiagram />);
    const title = container.querySelector('title#diagram-copilot-title');
    expect(title).toBeInTheDocument();
    expect(title!.textContent).toMatch(/chat surface architecture/i);
    const desc = container.querySelector('desc#diagram-copilot-desc');
    expect(desc).toBeInTheDocument();
    expect(desc!.textContent).toMatch(/Orchestration API/i);
  });

  it('renders inside a <figure> with a <figcaption>', () => {
    const { container } = render(<CopilotDiagram />);
    const figure = container.querySelector('figure.diagram-wrap');
    expect(figure).toBeInTheDocument();
    const caption = figure!.querySelector('figcaption');
    expect(caption).toBeInTheDocument();
    expect(caption!.textContent).toMatch(/Fig 3/);
  });

  it('all SVG text elements use CSS variable fills', () => {
    const { container } = render(<CopilotDiagram />);
    assertCssVariableFills(container);
  });

  it('renders key node labels: Nav Pane, Chat Canvas, Config Gate', () => {
    render(<CopilotDiagram />);
    expect(screen.getByText('Nav Pane')).toBeInTheDocument();
    expect(screen.getByText('Chat Canvas')).toBeInTheDocument();
    expect(screen.getByText('Config Gate')).toBeInTheDocument();
  });
});

/* ══════════════════════════════════════════════════════════
   CaseStudyPage — diagram integration
   ══════════════════════════════════════════════════════════ */

describe('CaseStudyPage — diagram integration', () => {
  it('alexa-hands-free slug renders the AlexaDiagram', () => {
    const { container } = renderWithSlug('alexa-hands-free');
    const diagramWrap = container.querySelector('.cs-diagram');
    expect(diagramWrap).toBeInTheDocument();
    const svg = diagramWrap!.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
    expect(svg!.querySelector('title#diagram-alexa-title')).toBeInTheDocument();
  });

  it('voice-assistant-outlook slug renders the VoiceAssistantDiagram', () => {
    const { container } = renderWithSlug('voice-assistant-outlook');
    const diagramWrap = container.querySelector('.cs-diagram');
    expect(diagramWrap).toBeInTheDocument();
    const svg = diagramWrap!.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
    expect(svg!.querySelector('title#diagram-voice-title')).toBeInTheDocument();
  });

  it('m365-copilot slug renders the CopilotDiagram', () => {
    const { container } = renderWithSlug('m365-copilot');
    const diagramWrap = container.querySelector('.cs-diagram');
    expect(diagramWrap).toBeInTheDocument();
    const svg = diagramWrap!.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
    expect(svg!.querySelector('title#diagram-copilot-title')).toBeInTheDocument();
  });

  it('diagram figure and figcaption appear inside the case study page', () => {
    const { container } = renderWithSlug('alexa-hands-free');
    const figure = container.querySelector('.cs-diagram figure.diagram-wrap');
    expect(figure).toBeInTheDocument();
    expect(figure!.querySelector('figcaption')).toBeInTheDocument();
  });
});
