import {Component, Input} from '@angular/core';
import {Quest} from "../../../../shared/models/quest";
import {Router} from "@angular/router";

@Component({
  selector: 'quest-list-item',
  templateUrl: './quest-list-item.component.html',
  styleUrl: './quest-list-item.component.css'
})
export class QuestListItemComponent {
  @Input() quest!: Quest;

  constructor(private route: Router) {
  }
}
