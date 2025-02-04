import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/Login";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  cleanup();
});
describe("Login Button Component", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test("Checking api call on login button click", async () => {
    mockedAxios.post.mockResolvedValue({
      data: { access_token: "mock-token", token_type: "bearer" },
    });
    render(<Login />);
    const loginBtn = screen.getByTestId("login-btn");
    fireEvent.click(loginBtn);
    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/login",
      expect.any(Object)
    );
  });
});
