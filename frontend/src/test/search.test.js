// import axios from "axios";
// import Search from "../components/EnPage/Search";
// import { act, render, fireEvent, waitFor } from "@testing-library/react";

// jest.mock("axios");

// describe("Search component", () => {
//   it("should call API and update items state on search", async () => {
//     // mock axios response
//     axios.get.mockResolvedValue({ data: [{ en: "example", vn: "ví dụ" }] });

//     // render component
//     const { getByPlaceholderText } = render(<Search fromEng={true} />);

//     // simulate user input
//     const input = getByPlaceholderText("");
//     act(() => {
//       fireEvent.change(input, { target: { value: "example" } });
//     });

//     // wait for API call to complete
//     await waitFor(() => expect(axios.get).toHaveBeenCalled());

//     // assert that the items state was updated with the API response
//     expect(input.value).toBe("example");
//   });
// });
