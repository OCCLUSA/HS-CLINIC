type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

type TrackingParams = Record<string, string | number | boolean | undefined>;

function trackEvent(eventName: string, params: TrackingParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    event_category: 'patient_contact',
    ...params,
  });
}

export function trackWhatsAppClick(source: string) {
  trackEvent('whatsapp_click', {
    event_label: source,
    contact_method: 'whatsapp',
  });
}

export function trackPhoneClick(source: string) {
  trackEvent('phone_click', {
    event_label: source,
    contact_method: 'phone',
  });
}

export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', {
    event_label: formName,
    form_name: formName,
  });
}
