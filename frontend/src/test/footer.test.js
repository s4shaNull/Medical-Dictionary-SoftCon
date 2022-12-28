import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/EnPage/Footer";

test("renders Footer", () => {
    render(<Footer />);
    const bttt = screen.getByText("Back to the top");
    expect(bttt).toBeInTheDocument();

    const license = screen.getByText("© 2022 SoftCon.");
    expect(license).toBeInTheDocument();
});
