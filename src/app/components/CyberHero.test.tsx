import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CyberHero } from '@/app/components/CyberHero';

function renderHero() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <CyberHero />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('CyberHero', () => {
  it('renders the main heading text', () => {
    renderHero();
    expect(screen.getByText('Plan Your')).toBeInTheDocument();
    expect(screen.getByText('Confident Smile')).toBeInTheDocument();
  });

  it('renders the clinic service badge', () => {
    renderHero();
    expect(
      screen.getByText(/Dental implants, smile design, and bite care in Cairo/i)
    ).toBeInTheDocument();
  });

  it('renders the consultation CTA link', () => {
    renderHero();
    const ctaLink = screen.getByText(/Book a Consultation/i).closest('a');
    expect(ctaLink).toHaveAttribute('href', '/contact');
  });

  it('renders the technology CTA link', () => {
    renderHero();
    const techLink = screen.getByText(/See clinic technology/i).closest('a');
    expect(techLink).toHaveAttribute('href', '/technology');
  });

  it('does not render unsupported system claims', () => {
    renderHero();
    expect(screen.queryByText(/SYSTEM ONLINE/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ACCURACY: 99\.9%/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/EMG: STABLE/i)).not.toBeInTheDocument();
  });
});
