import * as vscode from 'vscode';
import { Pomodoro } from './pomodoro';
import { StatusBar } from './ui';

export function activate(context: vscode.ExtensionContext) {
	const pomodoro = Pomodoro.getInstance();
	

	vscode.commands.registerCommand(`pomodoro.addTask`, () => pomodoro.addTask());
	
	// pomodoro.run();
}

export function deactivate() {}