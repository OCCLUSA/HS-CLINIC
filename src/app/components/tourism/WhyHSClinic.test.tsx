import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhyHSClinic } from '@/app/components/tourism/WhyHSClinic';

function renderComponent() {
  return render(<WhyHSClinic />);
}

describe('WhyHSClinic', () => {
  it('renders the section heading', () => {
    renderComponent();
    expect(screen.getByText('Why HS Clinic Cairo?')).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    renderComponent();
    expect(screen.getByText('WHY PATIENTS CHOOSE US')).toBeInTheDocument();
  });

  it('renders all 6 reason card titles', () => {
    renderComponent();
    expect(screen.getByText('Fully Digital Workflow')).toBeInTheDocument();
    expect(screen.getByText('Sterilization Protocols')).toBeInTheDocument();
    expect(screen.getByText('Written Coverage Terms')).toBeInTheDocument();
    expect(screen.getByText('English-Speaking Team')).toBeInTheDocument();
    expect(screen.getByText('Digital Bite Planning')).toBeInTheDocument();
    expect(screen.getByText('Travel Coordination')).toBeInTheDocument();
  });

  it('renders description text for each reason', () => {
    renderComponent();
    expect(screen.getByText(/clinician-led treatment planning/i)).toBeInTheDocument();
    expect(screen.getByText(/infection control protocols/i)).toBeInTheDocument();
    expect(screen.getByText(/coverage conditions/i)).toBeInTheDocument();
  });
});
