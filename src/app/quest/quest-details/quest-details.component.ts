import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestService} from "../quest.service";

@Component({
  selector: 'quest-details',
  templateUrl: './quest-details.component.html',
  styleUrl: './quest-details.component.css'
})
export class QuestDetailsComponent {
  //die Questdaten werden geladen, aber nicht angezeigt, ausser die komponente lädt direkt (nicht möglich wegen Auth)
  quest: any = {};

  constructor(private quests: QuestService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      let id = val["id"];
      console.log(id);
      if (id) {
        this.quest = this.quests.getQuest(id);
        console.log(this.quest);
      }
    });
  }
}
