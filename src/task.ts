import { TimeUnits, Timer } from './timer';
import { getConfig } from './config';

export class Task {
  public name: string;
  public startTime: string;
  public isCompleted: boolean;

  constructor(_name: string, _startTime: string, _isCompleted: boolean = false) {
    this.name = _name;
    this.startTime = _startTime;
    this.isCompleted = _isCompleted;
  }

  public CompleteTask() {
    this.isCompleted = true;
  }

  public updateTaskName(newName: string) {
    this.name = newName;
  }

  public startTask(next: Function) : Timer {
    let duration = getConfig().task_duration;
    if (this.startTime !== `1970-01-01T00:00:00.000Z`){ // already started
      let difference = new Date().getTime() - new Date(this.startTime).getTime();
      duration = getConfig().task_duration - difference
    } else {
      this.startTime = `${new Date()}`;
    }

    let _timer = new Timer(duration, TimeUnits.Milliseconds);
    _timer.start(next);
    
    return _timer;
  }
}