import * as vscode from 'vscode';

export class StatusBar {
  private static _instance: StatusBar;

  private static timerStatusBar: vscode.StatusBarItem;
  private static tasksCounterStatusBar: vscode.StatusBarItem;
  private static taskStatusBar: vscode.StatusBarItem;
  private static startStatusBar: vscode.StatusBarItem;

  private constructor() {
    StatusBar.timerStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 3);
    StatusBar.tasksCounterStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 2);
    StatusBar.taskStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
    StatusBar.startStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 4);

    StatusBar.timerStatusBar.text = `$(watch) 00:00`;

    StatusBar.taskStatusBar.text = `nothing is currently running`;
    StatusBar.tasksCounterStatusBar.text = `(0/0)`;

    StatusBar.startStatusBar.text = `$(triangle-right)`;
    StatusBar.startStatusBar.color = 'lightgreen';
    StatusBar.startStatusBar.tooltip = 'start';
    StatusBar.startStatusBar.command = 'pomodoro.run';

    StatusBar.timerStatusBar.show();
    StatusBar.tasksCounterStatusBar.show();
    StatusBar.taskStatusBar.show();
    StatusBar.startStatusBar.show();

  }

  public static getInstance(): StatusBar {
    if (StatusBar._instance === undefined ){
      StatusBar._instance = new StatusBar();
    }
    return StatusBar._instance;
  }

  public updateTasksCounter(completedTasks: number = 0, totalTasks: number) {
    StatusBar.tasksCounterStatusBar.text = `(${completedTasks}/${totalTasks})`
  }

  public updateTimerBar(milliseconds) {
    StatusBar.timerStatusBar.text = `$(watch) ${this.convertMS(milliseconds)}`
  }

  public updateCurrentTask(name: string) {
    StatusBar.taskStatusBar.text = name
  }

  public updateStartBar(){
    if(StatusBar.startStatusBar.text === `$(triangle-right)`) {
      StatusBar.startStatusBar.text = `$(primitive-square)`;
      StatusBar.startStatusBar.color = 'red';
      StatusBar.startStatusBar.tooltip = 'pause';
      StatusBar.startStatusBar.command = 'pomodoro.pause'
    } else {
      StatusBar.startStatusBar.text = `$(triangle-right)`;
      StatusBar.startStatusBar.color = 'lightgreen';
      StatusBar.startStatusBar.tooltip = 'start';
      StatusBar.startStatusBar.command = 'pomodoro.run';
    }
  }

  public convertMS(ms): string {
    function pad(number) {
      return ('00' + number).slice(-2);
    }
    var mins, secs;
    secs = Math.floor(ms / 1000);
    mins = Math.floor(secs / 60);
    secs = secs % 60;

    return  pad(mins) + ':' + pad(secs);
  };

  public dispose() {
    StatusBar.timerStatusBar.dispose();
    StatusBar.tasksCounterStatusBar.dispose();
    StatusBar.taskStatusBar.dispose();
  }
}

export async function YesNoPrompt(prompt: string): Promise<boolean> {
  const optionYes = {
    title: "Yes"
  } as vscode.MessageItem;
  const optionNo = {
    title: "No"
  } as vscode.MessageItem;

  const selection = await vscode.window.showInformationMessage(
    prompt,
    optionYes, optionNo
  );

  if (selection.title === `Yes`) {
    return Promise.resolve(true);
  }else {
    return Promise.resolve(false);
  }
}

export async function InputPrompt(_prompt: string, _placeHolder: string): Promise<string> {
  const response: string = await vscode.window
    .showInputBox({
      prompt: _prompt,
      placeHolder: _placeHolder,
    });

  return response;
}