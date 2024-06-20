export function getCountries(lang = 'en'): { [code: string]: string | undefined } {
  const A: number = 65
  const Z: number = 90
  const countryName = new Intl.DisplayNames([lang], { type: 'region' });
  const countries: { [code: string]: string | undefined } = {}
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j)
      let name = countryName.of(code)
      if (code !== name) {
        countries[code] = name
      }
    }
  }
  return countries
}