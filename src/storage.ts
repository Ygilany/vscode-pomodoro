// import fs = require('fs');
// import { Task } from './task';
// import { Pomodoro } from './pomodoro';

// export interface TaskList extends Pomodoro {};


// export class TaskStorage {
//   private static _instance: TaskStorage;
//   private static filename: string;

//   private constructor() {
//   }

//   public getInstance() {
//     if (TaskStorage._instance === undefined) {
//       TaskStorage._instance = new TaskStorage();
//     }
//   }

//   // public load(): string {
//   //   let items = [];

//   //   // missing file (new install)
//   //   if (!fs.existsSync(this.filename)) {
//   //     this.taskList = items as TaskList;
//   //     return "";
//   //   }

//   //   try {
//   //     items = JSON.parse(fs.readFileSync(this.filename).toString());
//   //     this.taskList = items as TaskList;

//   //     return "";
//   //   } catch (error) {
//   //     return error.toString();
//   //   }
//   // }

//   // public reload() {
//   //   const items = [];

//   //   // missing file (new install)
//   //   if (!fs.existsSync(this.filename)) {
//   //     this.taskList = items as TaskList;
//   //   } else {
//   //     this.load();
//   //   }
//   // }

//   public static save(_taskList: TaskList) {
//     fs.writeFileSync(this.filename, JSON.stringify(_taskList, null, "\t"));
//   }
// }