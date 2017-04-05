import { workspace } from 'vscode';
import { TimeUnits } from './timer';

import path = require('path');

const DEFAULT_TASK_DURATION = 25 * TimeUnits.Minute;
const DEFAULT_BREAK_DURATION = 5 * TimeUnits.Minute;
const DEFAULT_LONG_BREAK_DURATION = 15 * TimeUnits.Minute;

const COUNTER_TO_LONG_BREAK = 3;

export interface Config {
    task_duration: number,
    break_duration: number,
    long_break_duration: number,
    counter_to_long_break: number, 
    tasks_file: string
}

export function getConfig(): Config {
    let configuration;
    try {
        configuration = workspace.getConfiguration('pomodoro');
    } catch (error) {}    
    
    return {
      task_duration: configuration.task_durarion * TimeUnits.Minute || DEFAULT_TASK_DURATION,
      break_duration: configuration.break_duration * TimeUnits.Minute || DEFAULT_BREAK_DURATION,
      long_break_duration: configuration.long_break_duration * TimeUnits.Minute || DEFAULT_LONG_BREAK_DURATION,
      counter_to_long_break: configuration.counter_to_long_break || COUNTER_TO_LONG_BREAK, 
      tasks_file: configuration.task_file || path.join(__dirname, `../../tasks.json`)
    } as Config;
}