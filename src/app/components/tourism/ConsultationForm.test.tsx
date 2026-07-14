import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConsultationForm } from '@/app/components/tourism/ConsultationForm';

function renderForm() {
  return render(
    <MemoryRouter>
      <ConsultationForm />
    </MemoryRouter>
  );
}

describe('ConsultationForm', () => {
  it('renders a records-first screening heading', () => {
    renderForm();
    expect(screen.getByText(/send records by whatsapp/i)).toBeInTheDocument();
  });

  it('does not collect patient details or files on the website', () => {
    renderForm();
    expect(document.querySelector('form')).toBeNull();
    expect(document.querySelector('input[type="file"]')).toBeNull();
  });

  it('uses WhatsApp as the primary records action without a reply-time promise', () => {
    renderForm();
    const link = screen.getByRole('link', { name: /continue in whatsapp/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('api.whatsapp.com'));
    expect(screen.queryByText(/24 hours/i)).not.toBeInTheDocument();
  });
});
