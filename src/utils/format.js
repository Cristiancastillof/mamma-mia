export function formatNumber(num) {
  // recibe número y devuelve con separador de miles (ej: 25000 -> "25.000")
  return num.toLocaleString('es-CL'); // usa punto como separador de miles
}
