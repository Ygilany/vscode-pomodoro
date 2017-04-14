import * as vscode from 'vscode';
import { Pomodoro } from './pomodoro';
import { StatusBar } from './ui';

export function activate(context: vscode.ExtensionContext) {
	const pomodoro = Pomodoro.getInstance();
	const statusBars = StatusBar.getInstance();

	pomodoro.preload();
	
	statusBars.updateTasksCounter(pomodoro.completedTasksCounter, pomodoro.tasks.length);

	vscode.commands.registerCommand(`pomodoro.addTask`, () => pomodoro.addTask());
	vscode.commands.registerCommand(`pomodoro.run`, () => pomodoro.run());	
	vscode.commands.registerCommand(`pomodoro.clear`, () => pomodoro.clearCompleted());	
	vscode.commands.registerCommand(`pomodoro.pause`, () => pomodoro.pause());
	vscode.commands.registerCommand(`pomodoro.finishTask`, () => pomodoro.stopTask());
}

export function deactivate() {}