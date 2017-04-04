const MINUTES_IN_HOUR: number = 60;
const SECONDS_IN_MINUTE: number = 60;
const MILLISECONDS_IN_SECOND : number = 1000;

export enum TimeUnits {
  Milliseconds = 1,
  Second = MILLISECONDS_IN_SECOND,
  Minute = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
  Hour = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND
};

export class Timer {
  public countdownMilliseconds: number;
  private isRunning: boolean;
  private _timer: NodeJS.Timer;


  constructor(countdown: number = 0, unit:TimeUnits) {
    this.countdownMilliseconds = countdown * unit;

  }

  public start (next?: Function) {
    if (!this.isRunning){
      this.isRunning = true;
      this._timer = setInterval(()=> {
        this.tick();
        if(this.countdownMilliseconds <= 0) {
          next();
        }
      }, TimeUnits.Second);
    }
  }

  public stop() {
    if(this.isRunning) {
      this.isRunning = false;
      clearInterval(this._timer);
    }
  }

  public reset() {
    if(this.isRunning) {
      this.stop();
      this.countdownMilliseconds = 0;
    }
  }

  public tick() {
    this.countdownMilliseconds -= TimeUnits.Second;
  }
}