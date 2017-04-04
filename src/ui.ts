import * as vscode from 'vscode';

export class StatusBar {
  private static _instance: StatusBar;

  private static timerStatusBar: vscode.StatusBarItem;
  private static tasksCounterStatusBar: vscode.StatusBarItem;
  private static taskStatusBar: vscode.StatusBarItem;

  private constructor() {
    StatusBar.timerStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    StatusBar.tasksCounterStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    StatusBar.taskStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);

    StatusBar.timerStatusBar.text = `00:00`;
    StatusBar.taskStatusBar.text = `nothing is currently running`;
    StatusBar.tasksCounterStatusBar.text = `(0/0)`

    StatusBar.timerStatusBar.show();
    StatusBar.tasksCounterStatusBar.show();
    StatusBar.taskStatusBar.show();

  }

  public static getInstance(): StatusBar {
    if (StatusBar._instance === undefined ){
      StatusBar._instance = new StatusBar();
    }
    return StatusBar._instance;
  }

  public updateTasksCounter(currentTask: number, totalTasks: number) {
    StatusBar.tasksCounterStatusBar.text = `(${currentTask}/${totalTasks})`
  }

  public updateTimerBar() {
    StatusBar.timerStatusBar.text = `Timer`
  }

  public updateCurrentTask(name: string) {
    StatusBar.taskStatusBar.text = `${name}`
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