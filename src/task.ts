import { TimeUnits, Timer } from './timer';
import { getConfig } from './config';

export class Task {
  public name: string;
  public startTime: string;
  public pauseTime: string;
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

  public PauseTask() : void {
    this.pauseTime = `${new Date()}`;
  }

  public startTask(next: Function) : Timer {
    let duration = getConfig().task_duration;    
    if (this.startTime !== null && this.startTime !== undefined){ // if the task already started      
      let difference: number;

      if(this.pauseTime !== null && this.pauseTime !== undefined) { // task was paused        
        difference = new Date(this.pauseTime).getTime() - new Date(this.startTime).getTime();

        let newStartTime = new Date();
        newStartTime.setTime(newStartTime.getTime() - (new Date(this.pauseTime).getTime() - new Date(this.startTime).getTime()));
        
        this.startTime = `${newStartTime}`;
      } else {        
        difference = new Date().getTime() - new Date(this.startTime).getTime()
      }
      duration -= difference      
    } else {
      this.startTime = `${new Date()}`;      
    }
    this.pauseTime = undefined;
    let _timer = new Timer(duration, TimeUnits.Milliseconds);
    _timer.start(next);
    
    return _timer;
  }
}