export class ConsoleManager {
  private static consoleManager?: ConsoleManager = null;

  private timerHandle: number = null;

  private constructor() {
    if (ConsoleManager.consoleManager === null) {
      ConsoleManager.consoleManager = new ConsoleManager();
    }

    return ConsoleManager.consoleManager;
  }

  public static sharedInstance(): ConsoleManager {
    return ConsoleManager.consoleManager;
  }

  public enableAlwaysClearConsole(): void {
    if (this.timerHandle !== null) {
      return;
    }

    this.timerHandle = setInterval(() => { console.clear(); }, 10);
  }

  public disableAlwaysClearConsole(): void {
    if (this.timerHandle === null) {
      return;
    }

    clearInterval(this.timerHandle);
  }
}
