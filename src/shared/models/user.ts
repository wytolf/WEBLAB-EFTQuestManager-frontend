import {Quest} from "./quest";

export class User {
  constructor(public id: number, public username: string, public password: string, public Role: Role, public activeQuests: Quest[]);
}
