import React from "react";
import { render, screen } from "@testing-library/react";
import DictLang from "../../components/EnPage/DictLang";
import { getTranslation } from "../../components/utils";

test("renders NavBar", () => {
  render(<DictLang language="en" getTranslation={getTranslation} />);
  const english = screen.getByText("English");
  expect(english).toBeInTheDocument();

  const vietnamese = screen.getByText("Vietnamese");
  expect(vietnamese).toBeInTheDocument();
});
