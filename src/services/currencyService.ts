
export async function getExchangeRates(base: string = "INR") {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return null;
  }
}
