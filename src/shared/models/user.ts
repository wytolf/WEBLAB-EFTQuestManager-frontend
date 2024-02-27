import {Quest} from "./quest";

export class User {
  constructor(public id: number, public username: string, public password: string, public role: string, public activeQuests: Quest[]) {

  }
}
