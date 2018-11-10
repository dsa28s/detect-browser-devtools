import { DebuggerManager } from './debugger/DebuggerManager';
import { ConsoleManager } from './devtools/ConsoleManager';
import { DevToolsManager } from './devtools/DevToolsManager';

export class DetectBrowserDevTools {
  /**
   * If developer tools opened, pause your current browser session.
   * @param isEnabled  `true` is enable this feature.
   */
  public freezeWhenDevToolsOpened(isEnabled: boolean): void {
    if (isEnabled) {
      DebuggerManager.sharedInstance().startMonitoringDebuggerAttach();
    } else {
      DebuggerManager.sharedInstance().stopMonitoringDebuggerAttach();
    }
  }

  /**
   * Disable all console log.
   * @param isEnabled  `true` is enable this feature.
   */
  public alwaysConsoleClear(isEnabled: boolean): void {
    if (isEnabled) {
      ConsoleManager.sharedInstance().enableAlwaysClearConsole();
    } else {
      ConsoleManager.sharedInstance().disableAlwaysClearConsole();
    }
  }

  /**
   * Receive monitoring developer tools isOpened event.
   * @param eventListener  eventListener (isOpened: boolean, orientation: string)
   */
  public startDevToolMonitoring(eventListener:
                             (isOpened: boolean, orientation: string) => any): void {
    DevToolsManager.sharedInstance().startMonitoringDevTools(eventListener);
  }

  /**
   * Stop monitoring developer tools isOpened event.
   */
  public stopDevToolMonitoring(): void {
    DevToolsManager.sharedInstance().stopMonitoringDevTools();
  }
}

export default new DetectBrowserDevTools();
