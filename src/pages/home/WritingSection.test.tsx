import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import WritingSection from './WritingSection';
import { writingData } from '../../data/portfolioData';
import type { BlogPost } from '../../types';

const BLOG_BASE = 'https://anindya.dev/blog';

const fakePosts: BlogPost[] = [
  { slug: 'post-one', title: 'First Post', date: '2025-01-15', excerpt: 'A short excerpt about the first post.' },
  { slug: 'post-two', title: 'Second Post', date: '2025-02-20', excerpt: 'Another excerpt for the second post.' },
  { slug: 'post-three', title: 'Third Post', date: '2025-03-10', excerpt: 'Third post excerpt here.' },
  { slug: 'post-four', title: 'Fourth Post', date: '2025-04-05', excerpt: 'Fourth post excerpt with details.' },
  { slug: 'post-five', title: 'Fifth Post', date: '2025-05-01', excerpt: 'Fifth and final excerpt.' },
];

const longExcerpt =
  'This is a really long excerpt that definitely exceeds one hundred and twenty characters so we can verify the truncation logic works on a word boundary properly.';

function mockFetchSuccess(data: BlogPost[]) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

function mockFetchFailure() {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('WritingSection — Happy Path', () => {
  it('renders 3 posts with date, title, and excerpt when fetch succeeds', async () => {
    mockFetchSuccess(fakePosts);
    render(<WritingSection />);

    for (const post of fakePosts.slice(0, 3)) {
      expect(await screen.findByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.date!)).toBeInTheDocument();
      expect(screen.getByText(post.excerpt!)).toBeInTheDocument();
    }
  });

  it('renders each date in a <time> element with a datetime attribute', async () => {
    mockFetchSuccess(fakePosts);
    const { container } = render(<WritingSection />);

    await screen.findByText(fakePosts[0].title);

    const timeElements = container.querySelectorAll('time');
    expect(timeElements).toHaveLength(3);
    timeElements.forEach((el, i) => {
      expect(el.getAttribute('datetime')).toBe(fakePosts[i].date);
    });
  });

  it('renders each title as a link to the blog post that opens in a new tab', async () => {
    mockFetchSuccess(fakePosts);
    render(<WritingSection />);

    for (const post of fakePosts.slice(0, 3)) {
      const link = await screen.findByRole('link', { name: new RegExp(post.title) });
      expect(link).toHaveAttribute('href', `${BLOG_BASE}/post/${post.slug}`);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });

  it('truncates excerpt at 120 chars on a word boundary with "…"', async () => {
    const postsWithLong: BlogPost[] = [
      { slug: 'long', title: 'Long Excerpt Post', date: '2025-06-01', excerpt: longExcerpt },
    ];
    mockFetchSuccess(postsWithLong);
    render(<WritingSection />);

    const titleEl = await screen.findByText('Long Excerpt Post');
    expect(titleEl).toBeInTheDocument();

    const truncated = longExcerpt.slice(0, 120);
    const lastSpace = truncated.lastIndexOf(' ');
    const expected = truncated.slice(0, lastSpace) + '\u2026';

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('renders posts inside an <ol> element', async () => {
    mockFetchSuccess(fakePosts);
    const { container } = render(<WritingSection />);

    await screen.findByText(fakePosts[0].title);

    const ol = container.querySelector('ol.writing-posts');
    expect(ol).toBeInTheDocument();
    expect(ol!.querySelectorAll('li.writing-post-item')).toHaveLength(3);
  });
});

describe('WritingSection — Fallback Path', () => {
  it('shows 3 fallback posts (title-only) when fetch fails', async () => {
    mockFetchFailure();
    render(<WritingSection />);

    await waitFor(() => {
      writingData.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(writingData.posts.length);
  });

  it('shows fallback posts when fetch returns an empty array', async () => {
    mockFetchSuccess([]);
    render(<WritingSection />);

    await waitFor(() => {
      writingData.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });
  });

  it('fallback posts have no dates or excerpts', async () => {
    mockFetchFailure();
    const { container } = render(<WritingSection />);

    await waitFor(() => {
      expect(screen.getByText(writingData.posts[0].title)).toBeInTheDocument();
    });

    expect(container.querySelectorAll('time')).toHaveLength(0);
    expect(container.querySelectorAll('.writing-post-excerpt')).toHaveLength(0);
  });
});

describe('WritingSection — Edge Cases', () => {
  it('renders date and title only when post has no excerpt (no empty <p>)', async () => {
    const noExcerpt: BlogPost[] = [
      { slug: 'no-excerpt', title: 'No Excerpt Post', date: '2025-07-01' },
    ];
    mockFetchSuccess(noExcerpt);
    const { container } = render(<WritingSection />);

    expect(await screen.findByText('No Excerpt Post')).toBeInTheDocument();
    expect(screen.getByText('2025-07-01')).toBeInTheDocument();
    expect(container.querySelectorAll('.writing-post-excerpt')).toHaveLength(0);
  });

  it('renders title and excerpt only when post has no date (no empty <time>)', async () => {
    const noDate: BlogPost[] = [
      { slug: 'no-date', title: 'No Date Post', excerpt: 'Some excerpt text.' },
    ];
    mockFetchSuccess(noDate);
    const { container } = render(<WritingSection />);

    expect(await screen.findByText('No Date Post')).toBeInTheDocument();
    expect(screen.getByText('Some excerpt text.')).toBeInTheDocument();
    expect(container.querySelectorAll('time')).toHaveLength(0);
  });

  it('renders fewer than 3 posts when API returns fewer', async () => {
    mockFetchSuccess(fakePosts.slice(0, 2));
    render(<WritingSection />);

    expect(await screen.findByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('aborts fetch on unmount (cleanup)', () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');
    mockFetchSuccess(fakePosts);

    const { unmount } = render(<WritingSection />);
    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});

describe('WritingSection — Accessibility', () => {
  it('arrow has aria-hidden="true"', async () => {
    mockFetchSuccess(fakePosts);
    const { container } = render(<WritingSection />);

    await screen.findByText(fakePosts[0].title);

    const arrows = container.querySelectorAll('.writing-post-arrow');
    expect(arrows.length).toBeGreaterThan(0);
    arrows.forEach((arrow) => {
      expect(arrow.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('links have visually-hidden "(opens in new tab)" text', async () => {
    mockFetchSuccess(fakePosts);
    render(<WritingSection />);

    await screen.findByText(fakePosts[0].title);

    const hiddenTexts = screen.getAllByText('(opens in new tab)');
    // 5 post links + "All posts" link + "Subscribe" link = at least 7
    expect(hiddenTexts.length).toBeGreaterThanOrEqual(fakePosts.length);
    hiddenTexts.forEach((el) => {
      expect(el).toHaveClass('visually-hidden');
    });
  });
});
