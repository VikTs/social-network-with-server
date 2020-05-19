export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const compareIncludeStrings = (initialValue, inputValue) => {
  if (typeof initialValue === 'string')
    return initialValue.toLowerCase().includes(inputValue.toLowerCase());
  else if (Array.isArray(initialValue))
    return initialValue.some(value => value.toLowerCase().includes(inputValue.toLowerCase()))
}