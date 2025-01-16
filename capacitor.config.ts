import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.uys2000.uplayer",
  appName: "UPlayer",
  webDir: "dist",
  loggingBehavior: "none",
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
  android: {
    loggingBehavior: "production",
    allowMixedContent: true,
  },
  //server: {
  //  url: "http://192.168.1.160:5173/",
  //  cleartext: true,
  //},
};

export default config;
