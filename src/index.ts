import DebuggerManager from './debugger/DebuggerManager';
import ConsoleManager from './devtools/ConsoleManager';
import DevToolsManager from './devtools/DevToolsManager';
import { Required, CheckRequiredParameters } from './utils/RequiredParameters';

class DetectBrowserDevTools {
  /**
   * If developer tools opened, pause current browser session.
   * @param isEnabled  `true` is enable this feature.
   */
  @CheckRequiredParameters
  public freezeWhenDevToolsOpened(@Required isEnabled: boolean): void {
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
  @CheckRequiredParameters
  public alwaysConsoleClear(@Required isEnabled: boolean): void {
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
  @CheckRequiredParameters
  public startDevToolMonitoring(@Required eventListener:
                                           (isOpened: boolean, orientation: string) => any): void {
    DevToolsManager.sharedInstance().startMonitoringDevTools(eventListener);
  }

  /**
   * Stop monitoring developer tools isOpened event.
   */
  @CheckRequiredParameters
  public stopDevToolMonitoring(): void {
    DevToolsManager.sharedInstance().stopMonitoringDevTools();
  }
}

const Manager = new DetectBrowserDevTools();
export { Manager };
