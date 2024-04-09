import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component', () => {
  it('toggles the theme from light to dark', () => {
    render(<App />);
    
    // Check the initial state of the theme (should be light mode)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Find the toggle theme button and click it
    const toggleButton = screen.getByText('Switch to Dark Mode');
    fireEvent.click(toggleButton);
    
    // Now, the dark class should be applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(toggleButton).toHaveTextContent('Switch to Light Mode');
  });

  it('toggles the theme from dark to light', () => {
    render(<App />);
    
    // Set the initial state to dark mode for this test
    fireEvent.click(screen.getByText('Switch to Dark Mode')); // Turn dark mode on
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Find the toggle theme button and click it
    const toggleButton = screen.getByText('Switch to Light Mode');
    fireEvent.click(toggleButton);
    
    // Now, the dark class should be removed
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(toggleButton).toHaveTextContent('Switch to Dark Mode');
  });

  // ... you can write more tests as needed
});
