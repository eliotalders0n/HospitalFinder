import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import SearchPage from "./SearchPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import AddHospitalPage from "./AddHospitalPage";

describe("App", () => {
  test("renders home page", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    const homePageElement = screen.getByText(/hospital finder/i);
    expect(homePageElement).toBeInTheDocument();
  });

  test("renders about page", () => {
    render(
      <Router>
        <AboutPage />
      </Router>
    );
    const aboutPageElement = screen.getByText(/founder of the company/i);
    expect(aboutPageElement).toBeInTheDocument();
  });

  test("renders search page", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    const searchPageElement =
      screen.getByPlaceholderText(/search for hospitals/i);
    expect(searchPageElement).toBeInTheDocument();
  });

  test("renders login page", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const loginPageElement = screen.getByText(/admin login/i);
    expect(loginPageElement).toBeInTheDocument();
  });

  test("renders dashboard page", () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );
    const dashboardPageElement = screen.getByText(/hospitals/i);
    expect(dashboardPageElement).toBeInTheDocument();
  });

  test("renders add hospital page", () => {
    render(
      <Router>
        <AddHospitalPage />
      </Router>
    );
    const addHospitalPageElement = screen.getByText(/add new hospital/i);
    expect(addHospitalPageElement).toBeInTheDocument();
  });
});
