import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";

describe("Home page hero", () => {

    it("shold render correctly", () => {
        render(
                <HomePage />
        )

        expect(screen.getByText("home")).toBeInTheDocument();
    });
});