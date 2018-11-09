import { DebuggerManager } from './debugger/DebuggerManager';

export class DetectBrowserDevTools {
  freezeWhenDevToolsOpened(isEnabled: boolean): void {
    if (isEnabled) {
      DebuggerManager.sharedInstance().startMonitoringDebuggerAttach();
    } else {
      DebuggerManager.sharedInstance().stopMonitoringDebuggerAttach();
    }
  }
}

export default new DetectBrowserDevTools();
