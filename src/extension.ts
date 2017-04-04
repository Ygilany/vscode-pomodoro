import * as vscode from 'vscode';
import { Pomodoro } from './pomodoro';

export function activate(context: vscode.ExtensionContext) {
	const pomodoro = Pomodoro.getInstance();
	pomodoro.addTask(`hello world`);
	
	pomodoro.run();
}

export function deactivate() {}