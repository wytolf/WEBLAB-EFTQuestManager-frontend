import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Quest} from "../../shared/models/quest";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, router: Router) {
  }

  getAllQuests() {
    console.log("getActualQuests() wurde aufgerufen");
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });
    return this.http.get('assets/quests.json', options);
  }

  getActualQuests() {
    console.log("getActualQuests() wurde aufgerufen");
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });
    return this.http.get<Array<Quest>>('http://127.0.0.1:4555/api/quests');
    //return this.http.get('assets/quests.json', options);
  }

  getQuest(id: number) {
    console.log("getQuest() wurde aufgerufen");
    console.log(id);
    let quest: Quest[] = [];

    this.getActualQuests().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          quest = data[i];
          console.log(quest);
          break;
        }
      }
    });
    console.log(quest);
    return quest;
  }

  addQuest(quest: Quest) {
    console.log("addQuest() wurde aufgerufen");
    console.log(quest);
    return this.http.post<Quest>('http://127.0.0.1:4555/api/quests', quest, this.getStandardOptions()).subscribe();
  }

  updateQuest(quest: Quest): Observable<any> {
    console.log("updateQuest() wurde aufgerufen");
    return this.http.post<Quest>('http://127.0.0.1:4555/api/quests', quest, this.getStandardOptions());

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
}
