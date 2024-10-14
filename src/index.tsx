import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-device-orientation' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DeviceOrientationModule = isTurboModuleEnabled
  ? require('./NativeDeviceOrientation').default
  : NativeModules.DeviceOrientation;

const DeviceOrientation = DeviceOrientationModule
  ? DeviceOrientationModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const getOrientation = async (): Promise<string> => {
  return await DeviceOrientation.getOrientation();
};

export const lockOrientation = (orientation: string): void => {
  DeviceOrientation.lockOrientation(orientation);
};

export const unlockOrientation = (): void => {
  DeviceOrientation.unlockOrientation();
};
