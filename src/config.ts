import { workspace } from 'vscode';
import { TimeUnits } from './timer';

const DEFAULT_TASK_DURATION = 25 * TimeUnits.Minute;
const DEFAULT_BREAK_DURATION = 5 * TimeUnits.Minute;
const DEFAULT_LONG_BREAK_DURATION = 15 * TimeUnits.Minute;

export interface Config {
    task_duration: number,
    break_duration: number,
    long_break_duration: number
}

export function getConfig(): Config {
    let configuration;
    try {
    configuration = workspace.getConfiguration('pomodoro');

    } catch (error) {}

    return {
      task_duration: configuration.task_durarion || DEFAULT_TASK_DURATION,
      break_duration: configuration.break_duration || DEFAULT_BREAK_DURATION,
      long_break_duration: configuration.long_break_duration || DEFAULT_LONG_BREAK_DURATION
    } as Config;
}