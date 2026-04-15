export function getWeatherLabel(code: number) {
  if (code === 0) return "Ceu limpo";
  if (code <= 3) return "Parcialmente nublado";
  if (code <= 48) return "Neblina";
  if (code <= 67) return "Chuva";
  if (code <= 77) return "Neve";
  if (code <= 82) return "Pancadas de chuva";
  if (code <= 86) return "Pancadas de neve";
  if (code <= 99) return "Tempestade";
  return "Condicao desconhecida";
}
