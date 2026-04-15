"use client";

import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "@/features/weather/hooks/use-debounced-value";

describe("useDebouncedValue", () => {
  it("returns the debounced value only after the configured delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delayMs }) => useDebouncedValue(value, delayMs),
      {
        initialProps: {
          value: "",
          delayMs: 300,
        },
      },
    );

    expect(result.current).toBe("");

    rerender({
      value: "sal",
      delayMs: 300,
    });

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("sal");
    vi.useRealTimers();
  });
});
