package com.uys2000.uplayer;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.cast.framework.CastContext;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    CastContext.getSharedInstance(this); // <--- add this
  }
}