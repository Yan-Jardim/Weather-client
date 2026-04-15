"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TemperatureUnit } from "@/features/weather/types";
import { TEMPERATURE_UNIT_OPTIONS } from "./constants";
import { getUnitToggleStyles } from "./styles";

type UnitToggleProps = {
  unit: TemperatureUnit;
  onChangeUnit: (unit: TemperatureUnit) => void;
  isDarkMode?: boolean;
};

export default function UnitToggle({
  unit,
  onChangeUnit,
  isDarkMode = false,
}: UnitToggleProps) {
  const styles = getUnitToggleStyles(isDarkMode);

  return (
    <ToggleButtonGroup
      value={unit}
      exclusive
      size="small"
      onChange={(_, value: TemperatureUnit | null) => {
        if (value) {
          onChangeUnit(value);
        }
      }}
      sx={styles.root}
    >
      {TEMPERATURE_UNIT_OPTIONS.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          aria-label={option.ariaLabel}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
