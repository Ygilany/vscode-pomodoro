import { Task } from './task';
import { TimeUnits, Timer } from './timer';
import { getConfig } from './config';

export class Pomodoro {
  public tasks: Task[];
  public completedTasksCounter: number;
  public currentTaskIndex: number;
  
  private breakCounter: number;

  private isRunning: boolean = false;

  private _timer: Timer;

  constructor() {
    this.tasks = [];
    this.completedTasksCounter = 0;
    this.breakCounter = 0;
  }

  public addTask(name: string) {
    this.tasks.push(new Task(name));
  }

  public start() {
    this.pickTask();

    this.isRunning = true;

    while(this.isRunning) {
      this._timer = this.tasks[this.currentTaskIndex].startTask();
      // prompt user to assess the status of the task that was running
      if (this.breakCounter <= getConfig().counter_to_long_break) {
        this._timer = new Timer(getConfig().break_duration, TimeUnits.Milliseconds); 
        this.breakCounter++;
      } else {
        this._timer = new Timer(getConfig().long_break_duration, TimeUnits.Milliseconds); 
        this.breakCounter = 0;
      }
    }
  }

  private pickTask(): void {
    if(this.tasks.length > 0) {
      if (this.currentTaskIndex !== undefined) {
        this.currentTaskIndex = 0;
      } else {
        if (this.tasks[this.currentTaskIndex].isCompleted) {
          this.currentTaskIndex += 1;
        }
      }
    }
  }

}