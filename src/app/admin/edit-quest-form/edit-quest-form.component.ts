import {Component, OnInit} from '@angular/core';
import {QuestService} from "../../quest/quest.service";
import {Quest} from "../../../shared/models/quest";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-quest-form',
  templateUrl: './edit-quest-form.component.html',
  styleUrl: './edit-quest-form.component.css'
})
export class EditQuestFormComponent implements OnInit {
  quest: Quest | undefined;

  constructor(private service: QuestService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getQuest();
  }

  getQuest(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    let matches = this.service.getQuest(id);
    this.quest = matches[0];
  }

  goBack(): void {
    //this.location.back();
  }

  save(): void {
    if (this.quest) {
      this.service.updateQuest(this.quest)
        .subscribe(() => this.goBack());
    }
  }
}
