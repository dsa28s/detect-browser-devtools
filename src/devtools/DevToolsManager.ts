export default class DevToolsManager {
  private static devToolsManager?: DevToolsManager = null;
  private monitoringTimer: number = null;

  private isDevtoolOpened = false;
  private consoleDirection = '';

  private threshold: number = 150;

  private constructor() { }

  public static sharedInstance(): DevToolsManager {
    if (DevToolsManager.devToolsManager === null) {
      DevToolsManager.devToolsManager = new DevToolsManager();
    }

    return DevToolsManager.devToolsManager;
  }

  public startMonitoringDevTools(eventListener:
                                     (isOpened: boolean, orientation: string) => any): void {
    if (this.monitoringTimer !== null) {
      console.warn('Already started monitoring dev tools!!');
      return;
    }

    this.monitoringTimer = setInterval(() => { this.monitoringTimerHandler(eventListener); },
                                       1000);
  }

  public stopMonitoringDevTools(): void {
    if (this.monitoringTimer === null) {
      console.warn('Not started monitoring dev tools!!');
      return;
    }

    clearInterval(this.monitoringTimer);
  }

  private monitoringTimerHandler(eventListener:
                                     (isOpened: boolean, orientation: string) => any): void {
    let isTriggered = false;
    let isOpened = false;

    // @ts-ignore
    // Firebug 지원이 중단됐다고는 하는데 그래도 지원은 해야겠지?
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
      isOpened = true;
      isTriggered = true;

      // console.info('SEC 1');
    }

    if (!isTriggered) {
      const devtools = /./;
      // @ts-ignore
      devtools.toString = () => {
        isOpened = true;
        isTriggered = true;

        // console.info('SEC 2');
      };
      console.log('%c', devtools);
      console.clear();
    }

    if (!isTriggered) {
      // Chrome 구버전에서 사용하기
      // @ts-ignore
      if (console.profiles !== undefined && console.profiles !== null) {
        console.profile();
        console.profileEnd();

        // @ts-ignore
        if (console.profiles.length > 0) {
          isOpened = true;
          isTriggered = true;

          // console.info('SEC 3');
        }
      }
    }

    const wt = window.outerWidth - window.innerWidth > this.threshold;
    const ht = window.outerHeight - window.innerHeight > this.threshold;

    // console.log(isOpened, wt, ht);

    let orientation = wt ? 'vertical' : 'horizontal';
    orientation = isOpened && !wt && !ht ? 'seperated-window' : orientation;
    orientation = !isOpened ? 'closed' : orientation;

    if (!isTriggered) { // 위에서 처리됐으면
      if (wt || ht) {
        isOpened = true;
      }
    }

    if (this.isDevtoolOpened !== isOpened || this.consoleDirection !== orientation) {
      this.isDevtoolOpened = isOpened;
      this.consoleDirection = orientation;

      eventListener(this.isDevtoolOpened, orientation);
    }
  }
}
