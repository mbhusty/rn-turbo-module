
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDeviceOrientationSpec.h"

@interface DeviceOrientation : NSObject <NativeDeviceOrientationSpec>
#else
#import <React/RCTBridgeModule.h>

@interface DeviceOrientation : NSObject <RCTBridgeModule>
#endif

@end
