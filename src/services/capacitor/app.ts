import { App } from "@capacitor/app";
export const backButtonListener = (callback: (canGoBack: boolean) => void) => {
  return App.addListener("backButton", ({ canGoBack }) => callback(canGoBack));
};
export const exit = () => {
  return App.exitApp();
};
