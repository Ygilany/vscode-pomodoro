import { Task } from './task';

export class Pomodoro {
  public tasks: Task[];
  public completedTasksCounter: number;
  public currentTaskIndex: number;

  private _timer: NodeJS.Timer;

  constructor() {
    this.tasks = [];
    this.completedTasksCounter = 0;
  }

  public addTask(name: string) {
    this.tasks.push(new Task(name));
  }

  public start() {
    if (this.tasks.length > 0) {
      if (this.currentTaskIndex !== undefined) {
        this.currentTaskIndex = 0;
      } else {
        this.currentTaskIndex += 1;
      }
    }
    this.tasks[this.currentTaskIndex].startTask();
  }


}