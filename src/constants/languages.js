import ISO6391 from "iso-639-1";

const languages = ISO6391.getAllCodes().map((code) => ({
  id: code, // "en", "hi", "fr"...
  name: ISO6391.getName(code), // English name, e.g. "English"
  native: ISO6391.getNativeName(code), // Native name, e.g. "हिन्दी"
}));

export default languages;
