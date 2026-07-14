import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackFormSubmit, trackPhoneClick, trackWhatsAppClick } from './analytics';

describe('patient contact analytics', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.gtag = undefined;
  });

  it('sends WhatsApp click events without patient details', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackWhatsAppClick('gulf_hero');

    expect(gtag).toHaveBeenCalledWith('event', 'whatsapp_click', {
      event_category: 'patient_contact',
      event_label: 'gulf_hero',
      contact_method: 'whatsapp',
    });
  });

  it('sends phone click events', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackPhoneClick('floating_cta');

    expect(gtag).toHaveBeenCalledWith('event', 'phone_click', {
      event_category: 'patient_contact',
      event_label: 'floating_cta',
      contact_method: 'phone',
    });
  });

  it('sends form submit events', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackFormSubmit('contact_form');

    expect(gtag).toHaveBeenCalledWith('event', 'form_submit', {
      event_category: 'patient_contact',
      event_label: 'contact_form',
      form_name: 'contact_form',
    });
  });

  it('does nothing when Google tag is unavailable', () => {
    expect(() => trackWhatsAppClick('missing_gtag')).not.toThrow();
  });
});
