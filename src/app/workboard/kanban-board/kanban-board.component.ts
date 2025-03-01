import { Component, OnInit } from '@angular/core';

interface KanbanCard {
  id: string;
  title: string;
  type: 'task' | 'rule' | 'evidence';
  role?: 'underwriter' | 'case-manager';
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  assignee?: string;
  evidenceType?: string;
  ruleCategory?: string;
}

type ColumnId = 'todo' | 'in-progress' | 'completed';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  columns: ColumnId[] = ['todo', 'in-progress', 'completed'];
  columnTitles: Record<ColumnId, string> = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  cards: Record<ColumnId, KanbanCard[]> = {
    'todo': [
      {
        id: '1',
        title: 'Review Medical History',
        type: 'task',
        role: 'underwriter',
        description: 'Complete medical history review for policy application',
        priority: 'high',
        dueDate: new Date('2024-03-15'),
        assignee: 'John Smith'
      },
      {
        id: '2',
        title: 'Blood Pressure Assessment',
        type: 'rule',
        description: 'Evaluate blood pressure readings against policy guidelines',
        priority: 'medium',
        ruleCategory: 'Medical'
      },
      {
        id: '3',
        title: 'Request Lab Results',
        type: 'evidence',
        role: 'case-manager',
        description: 'Obtain recent laboratory test results',
        priority: 'high',
        evidenceType: 'Medical Records',
        dueDate: new Date('2024-03-10')
      }
    ],
    'in-progress': [
      {
        id: '4',
        title: 'Lifestyle Assessment',
        type: 'rule',
        description: 'Evaluate lifestyle factors and risk assessment',
        priority: 'medium',
        ruleCategory: 'Risk Assessment'
      },
      {
        id: '5',
        title: 'Process APS Records',
        type: 'task',
        role: 'case-manager',
        description: 'Review and process attending physician statements',
        priority: 'high',
        dueDate: new Date('2024-03-12'),
        assignee: 'Sarah Johnson'
      }
    ],
    'completed': [
      {
        id: '6',
        title: 'Initial Health Screening',
        type: 'evidence',
        role: 'underwriter',
        description: 'Review initial health screening results',
        priority: 'high',
        evidenceType: 'Health Screening',
        dueDate: new Date('2024-03-05')
      }
    ]
  };

  constructor() { }

  ngOnInit(): void { }

  getCardsByColumn(column: ColumnId): KanbanCard[] {
    return this.cards[column] || [];
  }

  onDrop(event: DragEvent, targetColumn: ColumnId): void {
    event.preventDefault();
    const cardId = (event.dataTransfer?.getData('text/plain') || '').trim();
    if (!cardId) return;

    // Find the card and its current column
    let sourceColumn: ColumnId | undefined;
    let card: KanbanCard | undefined;

    for (const [col, cards] of Object.entries(this.cards)) {
      const foundCard = cards.find(c => c.id === cardId);
      if (foundCard) {
        sourceColumn = col as ColumnId;
        card = foundCard;
        break;
      }
    }

    if (card && sourceColumn && sourceColumn !== targetColumn) {
      // Remove from source column
      this.cards[sourceColumn] = this.cards[sourceColumn].filter(c => c.id !== cardId);
      // Add to target column
      this.cards[targetColumn] = [...this.cards[targetColumn], card];
    }
  }
}
