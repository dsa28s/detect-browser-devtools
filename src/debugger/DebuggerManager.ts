export default class DebuggerManager {
  private static debuggerManager?: DebuggerManager = null;

  private debuggerTimer: number = null;

  private constructor() { }

  public static sharedInstance(): DebuggerManager {
    if (DebuggerManager.debuggerManager === null) {
      DebuggerManager.debuggerManager = new DebuggerManager();
    }

    return DebuggerManager.debuggerManager;
  }

  startMonitoringDebuggerAttach() {
    if (this.debuggerTimer !== null) {
      console.warn('Monitoring timer already running.');

      return;
    }

    this.debuggerTimer = setInterval(() => { eval('debugger'); }, 10);
  }

  stopMonitoringDebuggerAttach() {
    if (this.debuggerTimer === null) {
      console.warn('Not running monitoring timer. ' +
        'Did you call startMonitoringDebuggerAttach() method before calling it?');

      return;
    }

    clearInterval(this.debuggerTimer);
  }
}
