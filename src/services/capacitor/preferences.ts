import { Preferences } from "@capacitor/preferences";

export const setPrefenceKeys = async () => {
  const keys = await Preferences.keys();
  return keys.keys;
};

export const setPrefence = async (key: string, value: string) => {
  await Preferences.set({
    key: key,
    value: value,
  });
};

export const setPrefenceObject = async (key: string, value: object) => {
  await Preferences.set({
    key: key,
    value: JSON.stringify(value),
  });
};

export const getPrefence = async (key: string) => {
  const prefence = await Preferences.get({
    key: key,
  });
  return prefence.value;
};

export const getPrefenceObject = async <T>(key: string) => {
  const prefence = await Preferences.get({
    key: key,
  });
  return prefence.value ? (JSON.parse(prefence.value) as T) : null;
};

export const removePrefence = async (key: string) => {
  await Preferences.remove({ key: key });
};

export const clearPrefences = async () => {
  await Preferences.clear();
};
