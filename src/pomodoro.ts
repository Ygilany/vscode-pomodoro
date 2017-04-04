import { Task } from './task';
import { TimeUnits, Timer } from './timer';
import { getConfig } from './config';

export class Pomodoro {
	private static _instance: Pomodoro;

	public tasks: Task[];
	public completedTasksCounter: number;
	public currentTaskIndex: number;

	private breakCounter: number;

	private _timer: Timer;

	private constructor() {
		this.tasks = [];
		this.completedTasksCounter = 0;
		this.breakCounter = 0;
	}

	public static getInstance(): Pomodoro {		
		if (Pomodoro._instance === null || Pomodoro._instance === undefined) {
			Pomodoro._instance =  new Pomodoro();
		}
		return Pomodoro._instance;
	}

	public addTask(name: string) {
		const instance = Pomodoro.getInstance();
		instance.tasks.push(new Task(name));
	}

	public run() {
		const instance = Pomodoro.getInstance();
		instance.pickTask();
		
		instance._timer = instance.tasks[instance.currentTaskIndex].startTask(instance.takeBreak);
	}

	private pickTask(): void {
		const instance = Pomodoro.getInstance();
		if (instance.tasks.length > 0) {
			if (instance.currentTaskIndex === undefined) {
				instance.currentTaskIndex = 0;
			} else {
				if (instance.tasks[instance.currentTaskIndex].isCompleted) {
					instance.currentTaskIndex += 1;
				}
			}
		}
	}

	private takeBreak(): void {
		const instance = Pomodoro.getInstance();
		// prompt user to assess the status of the task that was running
		if (instance.breakCounter <= getConfig().counter_to_long_break) {
			instance._timer = new Timer(getConfig().break_duration, TimeUnits.Milliseconds);
			instance.breakCounter++;
		} else {
			instance._timer = new Timer(getConfig().long_break_duration, TimeUnits.Milliseconds);
			instance.breakCounter = 0;
		}
		instance._timer.start(instance.run);
	}
}