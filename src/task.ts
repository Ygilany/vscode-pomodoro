import { TimeUnits, Timer } from './timer';
import { getConfig } from './config';

export class Task {
  public name: string;
  public startTime: Date;
  public isCompleted: boolean;

  constructor(_name: string, _startTime: string) {
    this.name = _name;
    this.startTime = new Date(_startTime);
    this.isCompleted = false;
  }

  public CompleteTask() {
    this.isCompleted = true;
  }

  public updateTaskName(newName: string) {
    this.name = newName;
  }

  public startTask(next: Function) : Timer {
    let _timer = new Timer(getConfig().task_duration, TimeUnits.Milliseconds);
    _timer.start(next);
    this.startTime = new Date();
    return _timer;
  }
}