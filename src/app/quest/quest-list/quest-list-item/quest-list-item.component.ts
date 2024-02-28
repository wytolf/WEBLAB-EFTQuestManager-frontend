import {Component, Input, OnInit} from '@angular/core';
import {Quest} from "../../../../shared/models/quest";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'quest-list-item',
  templateUrl: './quest-list-item.component.html',
  styleUrl: './quest-list-item.component.css'
})
export class QuestListItemComponent implements OnInit {
  @Input() quest!: Quest;
  isAdmin: boolean = false;
  constructor(private route: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isAdmin = this.authService.user?.role === "admin";
  }

}
