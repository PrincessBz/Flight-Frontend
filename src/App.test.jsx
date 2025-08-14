import { render, screen } from '@testing-library/react';
import App from './App';
import { test, expect } from 'vitest'; // Vite uses vitest instead of jest by default


test('renders the main heading', () => {
    // 1. Render the App component into a virtual screen
    render(<App />);

    // 2. Find an element on the screen that contains the text "Flight Departures"
    const headingElement = screen.getByText(/Flight Departures/i);

    // 3. Assert that the element was actually found in the document
    expect(headingElement).toBeInTheDocument();
});