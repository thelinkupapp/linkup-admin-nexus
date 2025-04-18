
export const getCountryEmoji = (country: string) => {
  const emojiMap: { [key: string]: string } = {
    'UK': '🇬🇧',
    'USA': '🇺🇸',
    'UAE': '🇦🇪',
    'Ireland': '🇮🇪',
    'Singapore': '🇸🇬',
    'Spain': '🇪🇸',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
    'Brazil': '🇧🇷',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Canada': '🇨🇦',
    'Italy': '🇮🇹',
    'Netherlands': '🇳🇱',
    'Belgium': '🇧🇪',
    'Switzerland': '🇨🇭',
    'Austria': '🇦🇹',
    'Sweden': '🇸🇪',
    'Denmark': '🇩🇰',
    'Norway': '🇳🇴',
    'Finland': '🇫🇮',
    'United States': '🇺🇸',
  };
  return emojiMap[country] || '🌍';
};

export const getGenderEmoji = (gender: string) => {
  const emojiMap: { [key: string]: string } = {
    'Male': '💁‍♂️',
    'Female': '💁‍♀️',
    'Non-binary': '💖'
  };
  return emojiMap[gender] || '💖';
};
