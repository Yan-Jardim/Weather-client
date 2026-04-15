"use client";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UnitToggle from "@/features/weather/components/unit-toggle";

describe("UnitToggle", () => {
  it("changes the selected unit", () => {
    const onChangeUnit = vi.fn();

    render(<UnitToggle unit="celsius" onChangeUnit={onChangeUnit} />);

    fireEvent.click(screen.getByRole("button", { name: "usar Fahrenheit" }));

    expect(onChangeUnit).toHaveBeenCalledWith("fahrenheit");
  });

  it("does not emit a null value when clicking the selected unit", () => {
    const onChangeUnit = vi.fn();

    render(<UnitToggle unit="celsius" onChangeUnit={onChangeUnit} />);

    fireEvent.click(screen.getByRole("button", { name: "usar Celsius" }));

    expect(onChangeUnit).not.toHaveBeenCalled();
  });
});
