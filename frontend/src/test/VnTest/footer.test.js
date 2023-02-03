import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/EnPage/Footer";
import { getTranslation } from "../../components/utils";

test("renders Footer", () => {
  render(<Footer language="vn" getTranslation={getTranslation} />);
  const bttt = screen.getByText("Quay lại đầu trang");
  expect(bttt).toBeInTheDocument();

  const license = screen.getByText("© 2022 SoftCon.");
  expect(license).toBeInTheDocument();
});
