import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KanbanBoardComponent } from '../../workboard/kanban-board/kanban-board.component';

type ColumnId = 'todo' | 'in-progress' | 'completed';
type CardType = 'task' | 'rule' | 'evidence';
type Priority = 'low' | 'medium' | 'high';

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  type: CardType;
  role?: 'underwriter' | 'case-manager';
  dueDate?: Date;
  priority: Priority;
}

@Injectable({
  providedIn: 'root'
})
export class WorkboardStateService {
  private workboardComponent: KanbanBoardComponent | null = null;

  setWorkboardComponent(component: KanbanBoardComponent) {
    this.workboardComponent = component;
  }

  isAllTasksCompleted(): boolean {
    if (!this.workboardComponent) return false;
    
    const cards = this.workboardComponent.cards;
    const todoCards = cards['todo'].length;
    const inProgressCards = cards['in-progress'].length;
    
    return todoCards === 0 && inProgressCards === 0;
  }

  isEmpty(): boolean {
    if (!this.workboardComponent) return false;
    
    const cards = this.workboardComponent.cards;
    const totalCards = Object.values(cards as Record<ColumnId, KanbanCard[]>).reduce((sum, column) => sum + column.length, 0);
    
    return totalCards === 0;
  }
} 