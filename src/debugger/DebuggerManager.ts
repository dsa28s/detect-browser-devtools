export class DebuggerManager {
  private static debuggerManager?: DebuggerManager = null;

  private debuggerTimer: number = null;

  private constructor() {
    if (DebuggerManager.debuggerManager === null) {
      DebuggerManager.debuggerManager = new DebuggerManager();
    }

    return DebuggerManager.debuggerManager;
  }

  public static sharedInstance(): DebuggerManager {
    return DebuggerManager.debuggerManager;
  }

  public startMonitoringDebuggerAttach(): void {
    if (this.debuggerTimer !== null) {
      console.warn('Monitoring timer already running.');

      return;
    }

    this.debuggerTimer = setInterval(() => { debugger; }, 10);
  }

  public stopMonitoringDebuggerAttach(): void {
    if (this.debuggerTimer === null) {
      console.warn('Not running monitoring timer. ' +
        'Did you call startMonitoringDebuggerAttach() method before calling it?');

      return;
    }

    clearInterval(this.debuggerTimer);
  }
}
