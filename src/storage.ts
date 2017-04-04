import fs = require('fs');
import { Task } from './task';
import { Pomodoro } from './pomodoro';

export class TaskStorage {
  private filename: string;
  private _pomodoro: Pomodoro;

  constructor(_filename: string) {
    this.filename = _filename;
  }

  public save(): void {
    if (this._pomodoro === undefined) {
      this._pomodoro = Pomodoro.getInstance();
    }
    fs.writeFileSync(this.filename, JSON.stringify(this._pomodoro.tasks, null, "\t"));
  }

  public load(): void {
    let tasks: Task[] = [];

    if (this._pomodoro === undefined) {
      this._pomodoro = Pomodoro.getInstance();
    }

    if (!fs.existsSync(this.filename)) {
      this._pomodoro.tasks = tasks
    }

    try {
      let items = JSON.parse(fs.readFileSync(this.filename).toString());

      tasks = items.map(t => {
        return new Task(t.name, t.startTime, t.isCompleted)
      });
      
      this._pomodoro.tasks = tasks;

    } catch (error) {
      console.log(error);
    }
  }

}