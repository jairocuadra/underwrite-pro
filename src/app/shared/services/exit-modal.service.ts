import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExitModalComponent, ExitModalData } from '../exit-modal/exit-modal.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExitModalService {
  constructor(private dialog: MatDialog) {}

  showExitModal(scenario: 'all_completed' | 'incomplete' | 'empty'): Observable<boolean> {
    const dialogRef = this.dialog.open(ExitModalComponent, {
      data: { scenario } as ExitModalData,
      disableClose: true,
      width: '500px'
    });

    return dialogRef.afterClosed();
  }
} 