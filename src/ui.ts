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

  public updateTasksCounter(currentTask: number = 0, totalTasks: number) {
    StatusBar.tasksCounterStatusBar.text = `(${currentTask}/${totalTasks})`
  }

  public updateTimerBar(timerText) {
    StatusBar.timerStatusBar.text = `$(watch) ${this.msToTime(timerText)}`
  }

  public updateCurrentTask(name: string) {
    StatusBar.taskStatusBar.text = `${name}`
  }

  public msToTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs;
}

  public dispose() {
    StatusBar.timerStatusBar.dispose();
    StatusBar.tasksCounterStatusBar.dispose();
    StatusBar.taskStatusBar.dispose();
  }
}

export async function YesNoPrompt(): Promise<boolean> {
  const optionYes = {
    title: "Yes"
  } as vscode.MessageItem;
  const optionNo = {
    title: "No"
  } as vscode.MessageItem;

  const selection = await vscode.window.showInformationMessage(
    `command is successfully added, do you need to add More?`,
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