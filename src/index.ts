import { DebuggerManager } from './debugger/DebuggerManager';
import { ConsoleManager } from './devtools/ConsoleManager';
import { DevToolsManager } from './devtools/DevToolsManager';

const devToolsManager = {
  /**
   * If developer tools opened, pause your current browser session.
   * @param isEnabled  `true` is enable this feature.
   */
  freezeWhenDevToolsOpened(isEnabled: boolean): void {
    if (isEnabled) {
      DebuggerManager.sharedInstance().startMonitoringDebuggerAttach();
    } else {
      DebuggerManager.sharedInstance().stopMonitoringDebuggerAttach();
    }
  },

  /**
   * Disable all console log.
   * @param isEnabled  `true` is enable this feature.
   */
  alwaysConsoleClear(isEnabled: boolean): void {
    if (isEnabled) {
      ConsoleManager.sharedInstance().enableAlwaysClearConsole();
    } else {
      ConsoleManager.sharedInstance().disableAlwaysClearConsole();
    }
  },

  /**
   * Receive monitoring developer tools isOpened event.
   * @param eventListener  eventListener (isOpened: boolean, orientation: string)
   */
  startDevToolMonitoring(eventListener:
    (isOpened: boolean, orientation: string) => any): void {
    DevToolsManager.sharedInstance().startMonitoringDevTools(eventListener);
  },

  /**
   * Stop monitoring developer tools isOpened event.
   */
  stopDevToolMonitoring(): void {
    DevToolsManager.sharedInstance().stopMonitoringDevTools();
  },
};

export default devToolsManager;
