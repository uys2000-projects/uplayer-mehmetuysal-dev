import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.uys2000.UPlayer",
  appName: "UPlayer",
  webDir: "dist",
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
};

export default config;
