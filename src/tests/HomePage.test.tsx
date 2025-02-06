import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/Home";
import { AuthContext } from "../context/AuthContext";

describe("Home Page - Borrowed Books Button", () => {
  test("should render the 'View Borrowed Books' button when role is 'User'", () => {
    const mockAuthContext = {
      role: "User",
      username: "testUser",
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Home />
      </AuthContext.Provider>
    );

    const borrowedButton = screen.getByTestId("Borrowed-btn");
    expect(borrowedButton).toBeInTheDocument();
  });

  test("dont render the 'View Borrowed Books' button when role is not 'User'", () => {
    const mockAuthContext = {
      role: "Admin",
      username: "testUser",

      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Home />
      </AuthContext.Provider>
    );

    const borrowedButton = screen.queryByTestId("Borrowed-btn");
    expect(borrowedButton).not.toBeInTheDocument();
  });
});
