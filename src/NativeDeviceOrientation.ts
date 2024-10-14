import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getOrientation(): Promise<string>;
  lockOrientation(orientation: string): void;
  unlockOrientation(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceOrientation');
