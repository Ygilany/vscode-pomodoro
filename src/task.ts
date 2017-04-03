export class Task {
  public name: string;
  public startTime: Date;
  public isCompleted: boolean;

  constructor(_name: string) {
    this.name = _name;
    this.isCompleted = false;
  }

  public CompleteTask() {
    this.isCompleted = true;
  }

  public updateTaskName(newName: string) {
    this.name = newName;
  }

  public startTask() {
    this.startTime = new Date();
  }
}