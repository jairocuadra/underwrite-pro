import { Component, OnInit } from '@angular/core';

type ColumnId = 'todo' | 'in-progress' | 'completed';

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'rule' | 'evidence';
  role?: 'underwriter' | 'case-manager';
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

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
        id: 't1',
        title: 'Review medical records',
        description: 'Review latest medical records for John Smith',
        type: 'task',
        role: 'underwriter',
        dueDate: new Date('2025-03-15'),
        priority: 'high'
      },
      {
        id: 't2',
        title: 'Request lab work',
        description: 'Request additional lab work for cholesterol levels',
        type: 'task',
        role: 'case-manager',
        dueDate: new Date('2025-03-10'),
        priority: 'medium'
      },
      {
        id: 'r1',
        title: 'Diabetes assessment',
        description: 'Apply diabetes risk assessment rule',
        type: 'rule',
        priority: 'high'
      }
    ],
    'in-progress': [
      {
        id: 'e1',
        title: 'APS from Dr. Johnson',
        description: 'Attending Physician Statement from primary care doctor',
        type: 'evidence',
        dueDate: new Date('2025-03-05'),
        priority: 'high'
      },
      {
        id: 'r2',
        title: 'Smoker status verification',
        description: 'Verify smoker status based on lab results',
        type: 'rule',
        priority: 'medium'
      }
    ],
    'completed': [
      {
        id: 't3',
        title: 'Initial application review',
        description: 'Complete initial review of application',
        type: 'task',
        role: 'underwriter',
        priority: 'high'
      },
      {
        id: 'e2',
        title: 'Blood test results',
        description: 'Blood panel results from LabCorp',
        type: 'evidence',
        priority: 'medium'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  getCardsByColumn(column: ColumnId): KanbanCard[] {
    return this.cards[column];
  }

  onDrop(event: DragEvent, targetColumn: ColumnId): void {
    event.preventDefault();
    const cardId = event.dataTransfer?.getData('text/plain');
    
    if (!cardId) return;
    
    // Find the card in any column
    let sourceColumn: ColumnId | null = null;
    let card: KanbanCard | null = null;
    
    for (const col of this.columns) {
      const cardIndex = this.cards[col].findIndex(c => c.id === cardId);
      if (cardIndex >= 0) {
        sourceColumn = col;
        card = this.cards[col][cardIndex];
        this.cards[col].splice(cardIndex, 1);
        break;
      }
    }
    
    if (card && sourceColumn && sourceColumn !== targetColumn) {
      this.cards[targetColumn].push(card);
    }
  }
}
