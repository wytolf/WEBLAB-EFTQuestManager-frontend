import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {QuestService} from "../quest.service";

@Component({
  selector: 'quest-details',
  templateUrl: './quest-details.component.html',
  styleUrl: './quest-details.component.css'
})
export class QuestDetailsComponent implements OnInit{
  quest: any = {};

  constructor(private quests: QuestService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   params => {
    //     let id= +params['id'];
    //     this.quest = this.quests.getQuest(id);
    //     console.log(this.quest);
    //   });

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id){
        this.quest = this.quests.getQuest(parseInt(id,10));
        console.log(this.quest);
      }
    })
  }

}
