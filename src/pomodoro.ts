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
		const pomodoro = Pomodoro.getInstance();
		pomodoro.tasks.push(new Task(name));
	}

	public run() {
		const pomodoro = Pomodoro.getInstance();
		pomodoro.pickTask();
		
		pomodoro._timer = pomodoro.tasks[pomodoro.currentTaskIndex].startTask(pomodoro.takeBreak);
	}

	private pickTask(): void {
		const pomodoro = Pomodoro.getInstance();
		if (pomodoro.tasks.length > 0) {
			if (pomodoro.currentTaskIndex === undefined) {
				pomodoro.currentTaskIndex = 0;
			} else {
				if (pomodoro.tasks[pomodoro.currentTaskIndex].isCompleted) {
					pomodoro.currentTaskIndex += 1;
				}
			}
		}
	}

	private takeBreak(): void {
		const pomodoro = Pomodoro.getInstance();
		// prompt user to assess the status of the task that was running
		if (pomodoro.breakCounter <= getConfig().counter_to_long_break) {
			pomodoro._timer = new Timer(getConfig().break_duration, TimeUnits.Milliseconds);
			pomodoro.breakCounter++;
		} else {
			pomodoro._timer = new Timer(getConfig().long_break_duration, TimeUnits.Milliseconds);
			pomodoro.breakCounter = 0;
		}
		pomodoro._timer.start(pomodoro.run);
	}
}