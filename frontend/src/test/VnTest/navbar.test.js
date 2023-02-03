import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../../components/EnPage/NavBar";
import { getTranslation } from "../../components/utils";

test("renders NavBar", () => {
  render(<NavBar language="vn" getTranslation={getTranslation} />);
  const logo = screen.getByText("Softcon");
  expect(logo).toBeInTheDocument();

  const title = screen.getByText("TỪ ĐIỂN Y KHOA");
  expect(title).toBeInTheDocument();
});
