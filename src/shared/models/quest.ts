import {Task} from "./task";

export class Quest {
  constructor(public id: number, public title: string, public trader: string, public map: string, public link: string, public tasks: Task[], public isComplete: boolean = false)
}
