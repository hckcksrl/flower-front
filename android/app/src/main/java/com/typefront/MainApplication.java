package com.typefront;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import co.jootopia.kakao.link.RNKakaoLinkPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new ReactSliderPackage(),
            new RNKakaoLinkPackage(),
            new AsyncStoragePackage(),
            new RNKakaoLoginsPackage(),
            new ImagePickerPackage(),
            new CameraRollPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
