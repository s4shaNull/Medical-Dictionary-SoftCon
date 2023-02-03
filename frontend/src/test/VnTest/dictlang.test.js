import React from "react";
import { render, screen } from "@testing-library/react";
import DictLang from "../../components/EnPage/DictLang";
import { getTranslation } from "../../components/utils";

test("renders NavBar", () => {
  render(<DictLang language="vn" getTranslation={getTranslation} />);
  const english = screen.getByText("Tiếng Anh");
  expect(english).toBeInTheDocument();

  const vietnamese = screen.getByText("Tiếng Việt");
  expect(vietnamese).toBeInTheDocument();
});
