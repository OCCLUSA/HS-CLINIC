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
  it('renders the consultation heading', () => {
    renderForm();
    expect(screen.getByText(/virtual case review/i)).toBeInTheDocument();
  });

  it('renders name and email input fields', () => {
    renderForm();
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderForm();
    const button = screen.getByRole('button', { name: /send case details/i });
    expect(button).toBeInTheDocument();
  });
});
