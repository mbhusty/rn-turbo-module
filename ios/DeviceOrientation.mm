#import "DeviceOrientation.h"
#import <UIKit/UIKit.h>
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>

@implementation DeviceOrientation

RCT_EXPORT_MODULE()


// Метод для получения текущей ориентации
- (NSString *)getCurrentOrientation {
  UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
  if (UIInterfaceOrientationIsLandscape(orientation)) {
    return @"LANDSCAPE";
  } else if (UIInterfaceOrientationIsPortrait(orientation)) {
    return @"PORTRAIT";
  } else {
    return @"UNKNOWN";
  }
}

RCT_EXPORT_METHOD(getOrientation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([self getCurrentOrientation]);
}

// Метод блокировки ориентации через AppDelegate
RCT_EXPORT_METHOD(lockOrientation:(NSString *)orientation)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIInterfaceOrientationMask orientationMask;

    if ([orientation isEqualToString:@"LANDSCAPE"]) {
      orientationMask = UIInterfaceOrientationMaskLandscape;
    } else if ([orientation isEqualToString:@"PORTRAIT"]) {
      orientationMask = UIInterfaceOrientationMaskPortrait;
    } else {
      orientationMask = UIInterfaceOrientationMaskAll;
    }

    // Отправка сообщения для AppDelegate о блокировке ориентации
    [[NSNotificationCenter defaultCenter] postNotificationName:@"lockOrientation" object:@(orientationMask)];
  });
}

RCT_EXPORT_METHOD(unlockOrientation)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIDevice currentDevice] setValue:@(UIInterfaceOrientationUnknown) forKey:@"orientation"];
  });
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeDeviceOrientationSpecJSI>(params);
}
#endif

@end
