import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FAQAccordion } from '@/app/components/tourism/FAQAccordion';

function renderFAQ() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <FAQAccordion />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('FAQAccordion', () => {
  it('renders the section headings', () => {
    renderFAQ();
    expect(screen.getByText('KNOWLEDGE BASE')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders all 5 FAQ questions', () => {
    renderFAQ();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);
  });

  it('renders the cost review question text', () => {
    renderFAQ();
    expect(screen.getByText(/How is dental implant cost reviewed/i)).toBeInTheDocument();
  });

  it('renders the FAQ schema JSON-LD script', () => {
    renderFAQ();
    // react-helmet-async injects the script into document.head, not the container
    const script = document.head.querySelector('script[type="application/ld+json"]');
    expect(script).toBeDefined();
    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(5);
    }
  });

  it('clicking a question reveals the highlight badge', () => {
    renderFAQ();

    // Click the first question
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    // The highlight badge for the first FAQ should appear
    expect(screen.getByText('Case-by-case estimate')).toBeInTheDocument();
  });
});
