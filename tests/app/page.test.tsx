import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/weather/components/weather-dashboard", () => ({
  default: () => <div>mocked-weather-dashboard</div>,
}));

import Home from "@/app/page";

describe("Home page", () => {
  it("renders the weather dashboard", () => {
    render(<Home />);

    expect(screen.getByText("mocked-weather-dashboard")).toBeInTheDocument();
  });
});
