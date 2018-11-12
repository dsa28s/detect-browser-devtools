export default class ConsoleManager {
  private static consoleManager?: ConsoleManager = null;

  private timerHandle: number = null;

  private constructor() { }

  public static sharedInstance(): ConsoleManager {
    if (ConsoleManager.consoleManager === null) {
      ConsoleManager.consoleManager = new ConsoleManager();
    }

    return ConsoleManager.consoleManager;
  }

  public enableAlwaysClearConsole(): void {
    if (this.timerHandle !== null) {
      return;
    }

    this.timerHandle = setInterval(() => { console.clear(); }, 1000);
  }

  public disableAlwaysClearConsole(): void {
    if (this.timerHandle === null) {
      return;
    }

    clearInterval(this.timerHandle);
  }
}
