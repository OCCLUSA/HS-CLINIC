import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '@/app/components/Layout';
import { HelmetProvider } from 'react-helmet-async';

function renderLayout() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('Layout', () => {
  const internationalPatientLinks = [
    ['Start with your records', '/send-your-records'],
    ['Patient journey', '/dental-tourism/program'],
    ['Gulf patient guide', '/dental-tourism/gulf'],
    ['Europe patient guide', '/dental-tourism/europe'],
    ['Company partnerships', '/dental-tourism/partners'],
  ] as const;

  it('renders the clinic logo', () => {
    renderLayout();
    const logos = screen.getAllByAltText(/Dr\. Haitham Sharshar/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    renderLayout();

    // Use getAllByText for items that appear in both nav and footer
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Technology').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('renders the International Patients link', () => {
    renderLayout();
    expect(screen.getAllByText('International Patients').length).toBeGreaterThan(0);
  });

  it('keeps the desktop international patient menu concise and hub first', () => {
    renderLayout();

    fireEvent.click(screen.getByRole('button', { name: 'International Patients' }));
    const submenu = document.getElementById('desktop-submenu-international-patients');
    expect(submenu).not.toBeNull();

    for (const [name, href] of internationalPatientLinks) {
      expect(within(submenu!).getByRole('link', { name })).toHaveAttribute('href', href);
    }
    expect(within(submenu!).getAllByRole('link')).toHaveLength(internationalPatientLinks.length + 1);
    expect(within(submenu!).queryByRole('link', { name: 'Kuwait patients' })).toBeNull();
    expect(screen.getAllByRole('link', { name: 'HS Dental Cases' })[0]).toHaveAttribute(
      'href',
      '/gallery'
    );
  });

  it('keeps the mobile international patient menu concise and hub first', () => {
    renderLayout();

    fireEvent.click(screen.getByRole('button', { name: 'Open main menu' }));
    const tourismButtons = screen.getAllByRole('button', { name: 'International Patients' });
    fireEvent.click(tourismButtons[tourismButtons.length - 1]);
    const submenu = document.getElementById('mobile-submenu-international-patients');
    expect(submenu).not.toBeNull();

    for (const [name, href] of internationalPatientLinks) {
      expect(within(submenu!).getByRole('link', { name })).toHaveAttribute('href', href);
    }
    expect(within(submenu!).getAllByRole('link')).toHaveLength(internationalPatientLinks.length + 1);
    expect(within(submenu!).queryByRole('link', { name: 'Kuwait patients' })).toBeNull();
    expect(screen.getAllByRole('link', { name: 'HS Dental Cases' })[0]).toHaveAttribute(
      'href',
      '/gallery'
    );
  });

  it('renders footer with copyright', () => {
    renderLayout();
    const footer = screen.getByText(/Dr\. Haitham Sharshar/i);
    expect(footer).toBeInTheDocument();
  });
});
