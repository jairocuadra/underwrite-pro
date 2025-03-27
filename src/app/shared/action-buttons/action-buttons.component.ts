import { Component, OnInit } from '@angular/core';
import { ExitModalService } from '../services/exit-modal.service';
import { WorkboardStateService } from '../services/workboard-state.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {
  constructor(
    private exitModalService: ExitModalService,
    private workboardStateService: WorkboardStateService
  ) {}

  ngOnInit(): void {}

  onEditApplication(): void {
    // TODO: Implement edit application logic
    console.log('Edit application clicked');
  }

  onMoreActions(): void {
    // TODO: Implement more actions menu
    console.log('More actions clicked');
  }

  onExit(): void {
    let scenario: 'all_completed' | 'incomplete' | 'empty';
    
    if (this.workboardStateService.isEmpty()) {
      scenario = 'empty';
    } else if (this.workboardStateService.isAllTasksCompleted()) {
      scenario = 'all_completed';
    } else {
      scenario = 'incomplete';
    }

    this.exitModalService.showExitModal(scenario).subscribe(result => {
      if (result) {
        // Handle exit logic here
        console.log('User confirmed exit');
      }
    });
  }
} 