export default class DevToolsManager {
  private static devToolsManager?: DevToolsManager = null;
  private monitoringTimer: number = null;

  private isDevtoolOpened = false;
  private consoleDirection = false;

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
                                       50);
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
    let isTriggered = false; // 흠... 이것도 안타면 IE 문제일수도 있고 브라우저 버전이 낮은거일수도 있으니...

    // @ts-ignore
    // Firebug 지원이 중단됐다고는 하는데 그래도 지원은 해야겠지?
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
      if (!this.isDevtoolOpened) {
        this.isDevtoolOpened = true;

        isTriggered = true;
      }
    }

    if (!isTriggered) {
      const devtools = /./;
      // @ts-ignore
      devtools.toString = () => {
        if (!this.isDevtoolOpened) {
          this.isDevtoolOpened = true;
        }

        isTriggered = true;

        return;
      };
    }

    if (!isTriggered) {
      // Chrome 구버전에서 사용하기
      if (console.profile) {
        console.profile();
        console.profileEnd();

        // @ts-ignore
        if (console.profiles.length > 0) {
          if (!this.isDevtoolOpened) {
            this.isDevtoolOpened = true;

            isTriggered = true;

            return;
          }
        }
      }
    }

    const wt = window.outerWidth - window.innerWidth > this.threshold;
    const ht = window.outerHeight - window.innerHeight > this.threshold;

    let orientation = wt ? 'vertical' : 'horizontal';
    orientation = this.isDevtoolOpened && !wt && !ht ? 'seperated-window' : orientation;

    if (isTriggered) { // 위에서 처리됐으면
      if (wt || ht) {
        this.isDevtoolOpened = true;
      }
    }

    eventListener(this.isDevtoolOpened, orientation);
  }
}
