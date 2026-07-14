import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CaseComparisonSlider } from './CaseComparisonSlider';

describe('CaseComparisonSlider', () => {
  it('switches between complete before and after photographs without a hybrid slider', () => {
    render(
      <CaseComparisonSlider
        caseTitle="Approved case example"
        before={{ src: '/before.webp', alt: 'Before treatment clinical photograph' }}
        after={{ src: '/after.webp', alt: 'After treatment clinical photograph' }}
        width={940}
        height={1200}
        caption="Visible treatment context approved by the clinician and patient."
      />
    );

    expect(screen.queryByRole('slider')).not.toBeInTheDocument();

    const beforeButton = screen.getByRole('button', {
      name: /show before photo for approved case example/i,
    });
    const afterButton = screen.getByRole('button', {
      name: /show after photo for approved case example/i,
    });

    expect(beforeButton).toHaveAttribute('aria-pressed', 'true');
    expect(afterButton).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByAltText('Before treatment clinical photograph')).toHaveAttribute(
      'src',
      '/before.webp'
    );
    expect(screen.queryByAltText('After treatment clinical photograph')).not.toBeInTheDocument();

    fireEvent.click(afterButton);

    expect(beforeButton).toHaveAttribute('aria-pressed', 'false');
    expect(afterButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByAltText('After treatment clinical photograph')).toHaveAttribute(
      'src',
      '/after.webp'
    );
    expect(screen.queryByAltText('Before treatment clinical photograph')).not.toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveClass('object-contain');
    expect(images[0]).toHaveAttribute('width', '940');
    expect(screen.getByText(/individual outcomes vary/i)).toBeInTheDocument();
    expect(screen.getByText(/visible treatment context/i).closest('figcaption')).toHaveClass(
      'pr-20',
      'sm:pr-5'
    );
  });
});
