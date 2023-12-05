export function getJSON(key: string): any {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}:`, error);
    }
  }
  return null;
}

export function setJSON(key: string, value: any): void {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error serializing value for key ${key}:`, error);
  }
}
