import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/Login";

import apiCall from "../config/ApiConfig";

jest.mock("axios");

afterEach(() => {
  cleanup();
});

jest.mock("../config/ApiConfig", () => ({
  apiCall: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    get: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({}),
  },
}));

describe("Login Button Component", () => {
  test("Checking api call on login button click", async () => {
    (apiCall.get as jest.Mock).mockResolvedValue({
      data: { access_token: "mock-token", token_type: "bearer" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: { url: "/login" },
    });
    render(<Login />);
    const loginBtn = screen.getByTestId("login-btn");
    fireEvent.click(loginBtn);

    await waitFor(() => expect(apiCall.post).toHaveBeenCalled());
    expect(apiCall.post).toHaveBeenCalledWith("/login", expect.any(Object));
  });

  test("Check Existence of Button", async () => {
    render(<Login />);
    const loginBtn = screen.getByTestId("login-btn");
    expect(loginBtn).toBeInTheDocument();
  });

  test("should display error message on failed login", async () => {
    (apiCall.get as jest.Mock).mockRejectedValue({
      response: { data: { detail: "Invalid credentials" } },
    });

    render(<Login />);
    const loginBtn = screen.getByTestId("login-btn");

    fireEvent.click(loginBtn);

    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
