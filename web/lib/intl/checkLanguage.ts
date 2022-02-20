export const languageFilter = (language?: string): string => {
  let _language = "en-US";
  const supportedLanguages = ["en-US", "zh-HK", "zh-CN"];
  if (language && supportedLanguages.find((value) => language == value))
    _language = language;
  return _language;
};
