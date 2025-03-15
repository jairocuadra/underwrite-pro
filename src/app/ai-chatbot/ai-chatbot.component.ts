import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Inject, AfterViewInit, HostListener } from '@angular/core';
import { AiChatbotService, ChatMessage, ChatSession } from '../services/ai-chatbot.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../shared/services/theme.service';
import { DOCUMENT } from '@angular/common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NdaDialogComponent } from './nda-dialog/nda-dialog.component';

interface ChatHistoryItem {
  date: Date;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-ai-chatbot',
  templateUrl: './ai-chatbot.component.html',
  styleUrls: ['./ai-chatbot.component.scss']
})
export class AiChatbotComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('fileInput') private fileInput!: ElementRef;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('messageTextarea') messageTextarea!: ElementRef<HTMLTextAreaElement>;
  
  chatSession$: Observable<ChatSession>;
  messageInput = new FormControl('');
  selectedFiles: File[] = [];
  showWelcomeMessage = true;
  isDarkMode = false;
  isHistorySidebarOpen = false;
  chatHistory: ChatHistoryItem[] = [];
  
  // User profile information
  userProfile = {
    displayName: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Underwriter',
    department: 'Life Insurance'
  };
  
  // Warning message
  warningMessage = 'For internal use only. All interactions are logged and monitored.';
  
  // NDA acknowledgment
  showNdaDialog = true;
  ndaAcknowledged = false;
  ndaContent = `By accessing this AI assistant, you agree to the following terms:

1. All information accessed through this system is confidential.

2. You will not share information obtained through this system with unauthorized parties.

3. You will use this system only for legitimate business purposes related to underwriting activities.

4. All interactions with this system are logged and may be monitored for compliance.

5. Violation of these terms may result in disciplinary action.

This agreement supplements any existing confidentiality agreements you have with the company.`;
  
  // Suggested questions for quick access
  suggestedQuestions: string[] = [
    'What are the underwriting guidelines?',
    'Explain the policy approval workflow',
    'How do I assess risk factors?',
    'What documents are required for policy approval?',
    'How to handle policy exceptions?'
  ];

  private shouldScroll = true;
  private contentFitsViewport = true;
  private lastContentHeight = 0;
  
  @HostListener('window:resize')
  onResize() {
    this.checkContentOverflow();
  }

  constructor(
    private chatbotService: AiChatbotService, 
    private themeService: ThemeService,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.chatSession$ = this.chatbotService.getChatSession();
    
    // Initialize with current theme
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      
      // Ensure dark theme class is applied to body
      if (isDark) {
        this.document.body.classList.add('dark-theme');
      } else {
        this.document.body.classList.remove('dark-theme');
      }
    });
    
    // Load mock chat history
    this.initMockChatHistory();
  }

  ngOnInit(): void {
    // Initialize the chat
    
    // Listen for changes in the message input to resize the textarea
    this.messageInput.valueChanges.subscribe(value => {
      setTimeout(() => this.triggerResize(), 0);
    });
    
    // Show NDA dialog if not acknowledged
    if (this.showNdaDialog && !this.ndaAcknowledged) {
      this.openNdaDialog();
    }
  }
  
  ngAfterViewChecked(): void {
    // Only scroll if we're at or near the bottom already, or if there's a new message
    if (this.shouldScroll) {
      this.scrollToBottom();
    }
  }
  
  ngAfterViewInit(): void {
    // Ensure the textarea starts with minimal height
    setTimeout(() => {
      this.triggerResize();
      this.scrollToBottom();
    }, 100);
  }
  
  // Initialize mock chat history for demonstration
  private initMockChatHistory(): void {
    const now = new Date();
    
    // Create some mock history items
    this.chatHistory = [
      {
        date: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Yesterday
        messages: [
          {
            id: '1',
            text: 'What are the underwriting guidelines?',
            sender: 'user',
            timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000)
          },
          {
            id: '2',
            text: 'Our underwriting guidelines are designed to assess risk factors including health status, financial stability, and policy type. For specific guideline details, please specify the policy category.',
            sender: 'bot',
            timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000 + 2000)
          }
        ]
      },
      {
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        messages: [
          {
            id: '3',
            text: 'How do I assess risk factors?',
            sender: 'user',
            timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            id: '4',
            text: 'Risk assessment involves evaluating multiple factors including applicant health, financial status, occupation, and lifestyle. Our platform provides risk scoring tools and guidelines for each category.',
            sender: 'bot',
            timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 2000)
          }
        ]
      }
    ];
  }
  
  // Toggle dark mode
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode();
    
    // Ensure dark theme class is applied to body
    if (this.isDarkMode) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }
  
  // Toggle history sidebar
  toggleHistorySidebar(): void {
    this.isHistorySidebarOpen = !this.isHistorySidebarOpen;
    
    // Apply sidebar-open class to main container and input area
    setTimeout(() => {
      const mainContainer = this.document.querySelector('.chatbot-main-container');
      const inputContainer = this.document.querySelector('.input-area-container');
      
      if (mainContainer) {
        if (this.isHistorySidebarOpen) {
          mainContainer.classList.add('sidebar-open');
        } else {
          mainContainer.classList.remove('sidebar-open');
        }
      }
      
      if (inputContainer) {
        if (this.isHistorySidebarOpen) {
          inputContainer.classList.add('sidebar-open');
        } else {
          inputContainer.classList.remove('sidebar-open');
        }
      }
    }, 0);
  }
  
  // Load a chat history
  loadChatHistory(index: number): void {
    if (index >= 0 && index < this.chatHistory.length) {
      // Clear current chat
      this.chatbotService.clearChat();
      
      // Load messages from history
      const historyItem = this.chatHistory[index];
      historyItem.messages.forEach(message => {
        if (message.sender === 'user') {
          this.chatbotService.sendMessage(message.text, message.attachments || []);
        }
      });
      
      this.showWelcomeMessage = false;
      
      // Close sidebar and remove sidebar-open class
      this.isHistorySidebarOpen = false;
      
      setTimeout(() => {
        const mainContainer = this.document.querySelector('.chatbot-main-container');
        const inputContainer = this.document.querySelector('.input-area-container');
        
        if (mainContainer) {
          mainContainer.classList.remove('sidebar-open');
        }
        
        if (inputContainer) {
          inputContainer.classList.remove('sidebar-open');
        }
      }, 0);
    }
  }
  
  // Format history date
  formatHistoryDate(date: Date): string {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }
  
  // Check if content overflows and needs scrolling - simplified to fix glitchy behavior
  checkContentOverflow(): void {
    if (!this.chatContainer) return;
    
    const container = this.chatContainer.nativeElement;
    
    // Check if we should auto-scroll based on current scroll position
    const scrollPosition = container.scrollTop + container.clientHeight;
    const scrollThreshold = container.scrollHeight - 150;
    
    // We should auto-scroll if we're already near the bottom
    this.shouldScroll = scrollPosition >= scrollThreshold;
  }
  
  // Scroll to the bottom of the chat container - simplified
  scrollToBottom(): void {
    try {
      if (!this.chatContainer) return;
      
      const container = this.chatContainer.nativeElement;
      
      // Simple direct scrolling without animation frame to reduce glitchiness
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
  
  // Send a message to the chatbot
  sendMessage(): void {
    const message = this.messageInput.value?.trim();
    if (!message && this.selectedFiles.length === 0) return;
    
    // Convert files to base64 strings (simplified for demo)
    const attachments = this.selectedFiles.map(file => file.name);
    
    this.chatbotService.sendMessage(message || '', attachments);
    this.messageInput.setValue('');
    this.selectedFiles = [];
    this.showWelcomeMessage = false;
    
    // Force scroll to bottom when sending a new message
    this.shouldScroll = true;
    
    // Reset textarea height after sending
    setTimeout(() => {
      if (this.messageTextarea) {
        this.messageTextarea.nativeElement.style.height = '24px';
      }
      if (this.autosize) {
        this.autosize.reset();
      }
    }, 0);
    
    // Scroll to bottom immediately and then again after a delay
    this.scrollToBottom();
    setTimeout(() => {
      this.scrollToBottom();
    }, 150);
  }
  
  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.selectedFiles.push(input.files[i]);
      }
    }
  }
  
  // Remove a selected file
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
  
  // Trigger file input click
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  
  // Clear the chat history
  clearChat(): void {
    this.chatbotService.clearChat();
    this.showWelcomeMessage = true;
  }
  
  // Toggle between regular and advanced view
  toggleAdvancedView(isAdvanced: boolean): void {
    this.chatbotService.toggleAdvancedView(isAdvanced);
  }
  
  // Use a suggested question - now automatically sends the message
  useSuggestedQuestion(question: string): void {
    // Send the question directly instead of just setting it in the input
    this.chatbotService.sendMessage(question, []);
    this.showWelcomeMessage = false;
  }
  
  // Format timestamp for display
  formatTimestamp(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Handle Enter key press
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  
  // Trigger the autosize to adjust the textarea height
  triggerResize() {
    if (this.autosize) {
      this.autosize.resizeToFitContent(true);
      
      // If the textarea is empty, reset its height
      if (!this.messageInput.value || this.messageInput.value.trim() === '') {
        if (this.messageTextarea) {
          this.messageTextarea.nativeElement.style.height = '24px';
        }
      }
      
      // We don't need to manually adjust the container height
      // Let CSS handle the layout with proper padding and flex
    }
  }
  
  // Acknowledge NDA
  acknowledgeNda(): void {
    this.ndaAcknowledged = true;
    this.showNdaDialog = false;
  }
  
  // Open NDA dialog
  openNdaDialog(): void {
    // Create dialog config with panelClass for dark mode
    const dialogConfig = {
      width: '600px',
      disableClose: !this.ndaAcknowledged,
      data: { ndaContent: this.ndaContent, isDarkMode: this.isDarkMode },
      panelClass: this.isDarkMode ? ['dark-theme-dialog', 'dark-theme'] : '',
      backdropClass: this.isDarkMode ? 'dark-theme-backdrop' : ''
    };

    // Add dark-theme class to body to ensure proper styling
    if (this.isDarkMode) {
      this.document.body.classList.add('dark-theme');
    }

    const dialogRef = this.dialog.open(NdaDialogComponent, dialogConfig);

    // Apply dark theme class directly to dialog container
    if (this.isDarkMode) {
      setTimeout(() => {
        const dialogContainer = this.document.querySelector('.mat-dialog-container') as HTMLElement;
        if (dialogContainer) {
          dialogContainer.classList.add('dark-theme');
          dialogContainer.classList.add('dark-theme-dialog');
        }
      }, 0);
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.ndaAcknowledged = true;
        this.showNdaDialog = false;
      } else if (!this.ndaAcknowledged) {
        // If user cancels and hasn't acknowledged before, show a message or take appropriate action
        // For demo purposes, we'll just reopen the dialog
        setTimeout(() => this.openNdaDialog(), 500);
      }
    });
  }
}
