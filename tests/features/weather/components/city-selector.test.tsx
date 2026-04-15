"use client";

import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CITY_SEARCH_DEBOUNCE_MS } from "@/features/weather/components/city-selector/constants";

const { useCitySearchMock } = vi.hoisted(() => ({
  useCitySearchMock: vi.fn(),
}));

vi.mock("@/features/weather/hooks/use-weather", () => ({
  useCitySearch: useCitySearchMock,
}));

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual<typeof import("@mui/material")>(
    "@mui/material",
  );

  return {
    ...actual,
    Autocomplete: ({
      options,
      renderInput,
      renderOption,
      getOptionLabel,
      loading,
      loadingText,
      noOptionsText,
      onChange,
      onInputChange,
    }: {
      options: Array<{ id: number; name: string }>;
      renderInput: (params: {
        slotProps: { input: { endAdornment: null } };
      }) => unknown;
      renderOption: (
        props: { key: string; onClick: () => void },
        option: { id: number; name: string },
      ) => unknown;
      getOptionLabel: (option: { id: number; name: string }) => string;
      loading: boolean;
      loadingText: string;
      noOptionsText: string;
      onChange: (event: null, value: { id: number; name: string } | null) => void;
      onInputChange: (
        event: null,
        value: string,
        reason: "input" | "clear" | "reset",
      ) => void;
    }) => (
      <div>
        {renderInput({
          slotProps: {
            input: {
              endAdornment: null,
            },
          },
        })}
        <button type="button" onClick={() => onInputChange(null, "sal", "input")}>
          type-search
        </button>
        <button type="button" onClick={() => onInputChange(null, "", "clear")}>
          clear-search
        </button>
        <button type="button" onClick={() => onInputChange(null, "", "reset")}>
          reset-search
        </button>
        <button
          type="button"
          onClick={() => onChange(null, options.at(-1) ?? null)}
        >
          select-last-option
        </button>
        {loading ? <div>{loadingText}</div> : null}
        {!loading && options.length === 0 ? <div>{noOptionsText}</div> : null}
        <ul>
          {options.map((option) =>
            renderOption(
              {
                key: getOptionLabel(option),
                onClick: () => onChange(null, option),
              },
              option,
            ),
          )}
        </ul>
      </div>
    ),
    TextField: ({
      label,
      placeholder,
    }: {
      label: string;
      placeholder: string;
    }) => (
      <label>
        <span>{label}</span>
        <input placeholder={placeholder} />
      </label>
    ),
  };
});

import CitySelector from "@/features/weather/components/city-selector";

const selectedCity = {
  id: 1,
  name: "Sao Paulo",
  latitude: -23.55,
  longitude: -46.63,
  admin1: "SP",
  country: "Brasil",
};

afterEach(() => {
  useCitySearchMock.mockReset();
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("CitySelector", () => {
  it("renders recent cities and selects a searched city", () => {
    useCitySearchMock.mockImplementation((term: string) => ({
      data:
        term === "sal"
          ? [
              {
                id: 2,
                name: "Salvador",
                latitude: -12.97,
                longitude: -38.5,
                admin1: "BA",
                country: "Brasil",
              },
            ]
          : [],
      isLoading: false,
    }));

    const onSelectCity = vi.fn();

    render(
      <CitySelector
        selectedCity={selectedCity}
        onSelectCity={onSelectCity}
        recentCities={[
          selectedCity,
          {
            id: 3,
            name: "Santos",
            latitude: -23.96,
            longitude: -46.33,
            admin1: "SP",
            country: "Brasil",
          },
        ]}
      />,
    );

    expect(screen.getByText("Cidade")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Busque por cidade ou regiao"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sao Paulo")).toBeInTheDocument();
    expect(screen.getAllByText("Recente")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "type-search" }));

    expect(useCitySearchMock).toHaveBeenLastCalledWith("");

    act(() => {
      vi.advanceTimersByTime(CITY_SEARCH_DEBOUNCE_MS);
    });

    expect(useCitySearchMock).toHaveBeenLastCalledWith("sal");
    expect(screen.getByText("Salvador")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "select-last-option" }));

    expect(onSelectCity).toHaveBeenCalledWith({
      id: 2,
      name: "Salvador",
      latitude: -12.97,
      longitude: -38.5,
      admin1: "BA",
      country: "Brasil",
    });
  });

  it("shows loading and no-results states", () => {
    useCitySearchMock.mockImplementation((term: string) =>
      term === "sal"
        ? { data: [], isLoading: true }
        : { data: [], isLoading: false },
    );

    render(
      <CitySelector
        selectedCity={selectedCity}
        onSelectCity={vi.fn()}
        recentCities={[]}
        isDarkMode
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "type-search" }));
    expect(screen.getByText("Buscando cidades...")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(CITY_SEARCH_DEBOUNCE_MS);
    });

    expect(useCitySearchMock).toHaveBeenLastCalledWith("sal");

    fireEvent.click(screen.getByRole("button", { name: "clear-search" }));
    expect(
      screen.queryByText("Buscando cidades..."),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(CITY_SEARCH_DEBOUNCE_MS);
    });

    expect(useCitySearchMock).toHaveBeenLastCalledWith("");

    fireEvent.click(screen.getByRole("button", { name: "reset-search" }));
    expect(useCitySearchMock).toHaveBeenLastCalledWith("");
  });
});
