import NetInfo from '@react-native-community/netinfo';
import {
  NetworkStatus,
  NetworkStatusChangeCallback,
} from 'apollo-offline-client';

export default class ReactNativeNetworkStatus implements NetworkStatus {
  public onStatusChangeListener(callback: NetworkStatusChangeCallback): void {
    const listener = (connected: boolean) => {
      callback.onStatusChange({online: connected});
    };

    NetInfo.isConnected.addEventListener('connectionChange', listener);
  }

  public async isOffline(): Promise<boolean> {
    const isConnected = await NetInfo.isConnected.fetch();
    return !isConnected;
  }
}
