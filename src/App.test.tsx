import {
    // fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'

/**
 * Test if the App component renders correctly.
 */
test("renders welcome text", async () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  // initial heading should be present
  await waitFor(() => {
    const welcomeText = screen.getByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();
  });
});