import { Component, OnInit } from '@angular/core';

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
  
  // Selected card for the drawer
  selectedCard: KanbanCard | null = null;
  
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
        role: 'underwriter',
        dueDate: new Date('2025-03-20'),
        priority: 'high'
      }
    ],
    'in-progress': [
      {
        id: 'e1',
        title: 'APS from Dr. Johnson',
        description: 'Attending Physician Statement from primary care doctor',
        type: 'evidence',
        role: 'case-manager',
        dueDate: new Date('2025-03-05'),
        priority: 'high'
      },
      {
        id: 'r2',
        title: 'Smoker status verification',
        description: 'Verify smoker status based on lab results',
        type: 'rule',
        role: 'underwriter',
        dueDate: new Date('2025-03-12'),
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
        dueDate: new Date('2025-03-01'),
        priority: 'high'
      },
      {
        id: 'e2',
        title: 'Blood test results',
        description: 'Blood panel results from LabCorp',
        type: 'evidence',
        role: 'case-manager',
        dueDate: new Date('2025-02-28'),
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

  getCardTypeIcon(type: CardType): string {
    switch (type) {
      case 'task':
        return 'assignment';
      case 'rule':
        return 'gavel';
      case 'evidence':
        return 'description';
      default:
        return 'help_outline';
    }
  }

  getCardTypeTooltip(type: CardType): string {
    switch (type) {
      case 'task':
        return 'Task';
      case 'rule':
        return 'Rule';
      case 'evidence':
        return 'Evidence';
      default:
        return 'Unknown Type';
    }
  }

  cyclePriority(card: KanbanCard): void {
    const priorities: Priority[] = ['high', 'medium', 'low'];
    const currentIndex = priorities.indexOf(card.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    card.priority = priorities[nextIndex];
  }

  // Open the drawer with the selected card
  openCardDetails(card: KanbanCard): void {
    this.selectedCard = card;
    document.body.classList.add('drawer-open');
  }

  // Close the drawer
  closeCardDetails(): void {
    this.selectedCard = null;
    document.body.classList.remove('drawer-open');
  }

  // Get the column for a specific card by ID
  getColumnForCard(cardId: string): string {
    for (const column of this.columns) {
      const cardExists = this.cards[column].some(card => card.id === cardId);
      if (cardExists) {
        return this.columnTitles[column];
      }
    }
    return '';
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
