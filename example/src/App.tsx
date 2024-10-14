import { useState, useEffect } from 'react';
import {
  Button,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
} from 'react-native';
import { StyleSheet, Text } from 'react-native';
import {
  getOrientation,
  lockOrientation,
  unlockOrientation,
} from 'react-native-device-orientation';

export default function App() {
  const [orientation, setOrientation] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrientation = async () => {
      const currentOrientation = await getOrientation();
      setOrientation(currentOrientation);
    };
    fetchOrientation();

    // const eventEmitter = new NativeEventEmitter(
    //   NativeModules.DeviceOrientation
    // );
    // const subscription = eventEmitter.addListener(
    //   'orientationDidChange',
    //   (event) => {
    //     setOrientation(event.orientation);
    //   }
    // );

    // return () => {
    //   subscription.remove();
    // };
  }, [orientation]);

  const lockLandscape = () => lockOrientation('LANDSCAPE');
  const lockPortrait = () => lockOrientation('PORTRAIT');
  const unlock = () => unlockOrientation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Current Orientation: {orientation}</Text>
      <Button title="Lock Landscape" onPress={lockLandscape} />
      <Button title="Lock Portrait" onPress={lockPortrait} />
      <Button title="Unlock Orientation" onPress={unlock} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
