import {
  AdMob,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
  type AdOptions,
  type BannerAdOptions,
} from "@capacitor-community/admob";

export async function initializeAdMob(): Promise<void> {
  return await AdMob.initialize({});
}

export async function showAdMobBanner(callback: () => void): Promise<void> {
  AdMob.addListener(BannerAdPluginEvents.Loaded, callback);
  const options: BannerAdOptions = {
    adId: "ca-app-pub-6530204715466484/7965172463",
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
  };
  AdMob.showBanner(options);
}

export async function showAdMobInterstitial(
  callback: () => void
): Promise<void> {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, callback);
  const options: AdOptions = {
    adId: "interstitialca-app-pub-6530204715466484/4636301545",
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}
