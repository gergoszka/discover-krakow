import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


describe("App component", () => {
  test('renders itself', () => {
    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    )
  })
})