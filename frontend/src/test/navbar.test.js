import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../components/EnPage/NavBar";

test("renders NavBar", () => {
    render(<NavBar />);
    const logo = screen.getByText("Softcon");
    expect(logo).toBeInTheDocument();

    const title = screen.getByText("MEDICAL DICTIONARY");
    expect(title).toBeInTheDocument();
});