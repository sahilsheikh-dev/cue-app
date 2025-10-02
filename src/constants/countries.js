import * as countryCodes from "country-codes-list";

// Some countries have different phone number lengths (overrides)
const digitOverrides = {
  ae: "9", // UAE
  au: "9", // Australia
  // add more overrides if needed
};

// Use customList to build an object keyed by ISO2
const rawCountries = countryCodes.customList(
  "countryCode",
  "{countryNameEn},+{countryCallingCode}"
);

// Convert object → array in the format you want
const countries = Object.entries(rawCountries).map(([iso2, value]) => {
  const [name, code] = value.split(",");
  const id = iso2.toLowerCase();

  return {
    id,
    name,
    code,
    number_of_digit: digitOverrides[id] || "10",
    img: `https://flagcdn.com/w20/${id}.png`,
  };
});

export default countries;
