package com.deviceorientation

import android.content.pm.ActivityInfo
import android.content.res.Configuration
import android.app.Activity
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceOrientationModule (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

    @ReactMethod
    fun getOrientation(promise: Promise) {
        val orientation = currentActivity?.resources?.configuration?.orientation
        when (orientation) {
            Configuration.ORIENTATION_LANDSCAPE -> promise.resolve("LANDSCAPE")
            Configuration.ORIENTATION_PORTRAIT -> promise.resolve("PORTRAIT")
            else -> promise.resolve("UNKNOWN")
        }
    }

    @ReactMethod
    fun lockOrientation(orientation: String) {
        val activity: Activity? = currentActivity
        activity?.runOnUiThread {
            when (orientation) {
                "LANDSCAPE" -> activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
                "PORTRAIT" -> activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
                else -> activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
            }
        }
    }

    @ReactMethod
    fun unlockOrientation() {
        val activity: Activity? = currentActivity
        activity?.runOnUiThread {
            activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
        }
    }

  companion object {
    const val NAME = "DeviceOrientation"
  }
}
