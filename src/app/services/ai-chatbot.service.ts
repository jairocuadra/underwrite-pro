import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
  attachments?: string[];
}

export interface ChatSession {
  messages: ChatMessage[];
  isAdvancedView: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AiChatbotService {
  private chatSession = new BehaviorSubject<ChatSession>({
    messages: [],
    isAdvancedView: false
  });

  // Mock responses for demonstration purposes
  private mockResponses: { [key: string]: string } = {
    'hello': 'Hello! How can I assist you with underwriting today?',
    'policy': 'Our policy guidelines require thorough risk assessment before approval. Would you like me to explain the specific requirements for a particular policy type?',
    'underwriting': 'Underwriting is the process of evaluating risk to determine insurability and premium rates. Our platform streamlines this process with automated workflows and data integration.',
    'guidelines': 'Our underwriting guidelines are designed to assess risk factors including health status, financial stability, and policy type. For specific guideline details, please specify the policy category.',
    'workflow': 'The standard underwriting workflow includes application review, risk assessment, documentation verification, and final decision. Each step is tracked in our system for transparency.',
    'default': 'I understand your question about "{query}". Let me check our knowledge base for the most accurate information. Is there anything specific about this topic you\'d like to know?'
  };

  constructor() { }

  // Get the current chat session as an observable
  getChatSession(): Observable<ChatSession> {
    return this.chatSession.asObservable();
  }

  // Toggle between regular and advanced view
  toggleAdvancedView(isAdvanced: boolean): void {
    const currentSession = this.chatSession.value;
    this.chatSession.next({
      ...currentSession,
      isAdvancedView: isAdvanced
    });
  }

  // Send a message and get a response
  sendMessage(text: string, attachments: string[] = []): void {
    if (!text.trim() && attachments.length === 0) return;
    
    const messageId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: messageId,
      text: text,
      sender: 'user',
      timestamp: new Date(),
      attachments
    };
    
    // Add user message to chat
    const currentSession = this.chatSession.value;
    this.chatSession.next({
      ...currentSession,
      messages: [...currentSession.messages, userMessage]
    });
    
    // Add loading message
    const loadingMessage: ChatMessage = {
      id: `${messageId}-loading`,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    this.chatSession.next({
      ...this.chatSession.value,
      messages: [...this.chatSession.value.messages, loadingMessage]
    });
    
    // Generate response after delay (simulating API call)
    this.generateResponse(text).subscribe(response => {
      // Remove loading message and add actual response
      const updatedMessages = this.chatSession.value.messages.filter(m => m.id !== loadingMessage.id);
      
      const botMessage: ChatMessage = {
        id: `${messageId}-response`,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      this.chatSession.next({
        ...this.chatSession.value,
        messages: [...updatedMessages, botMessage]
      });
    });
  }
  
  // Clear the chat history
  clearChat(): void {
    const currentSession = this.chatSession.value;
    this.chatSession.next({
      ...currentSession,
      messages: []
    });
  }
  
  // Generate a response based on the user's message
  private generateResponse(message: string): Observable<string> {
    const lowerMessage = message.toLowerCase();
    let response = '';
    
    // Check for keywords in the message
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = this.mockResponses['hello'];
    } else if (lowerMessage.includes('policy')) {
      response = this.mockResponses['policy'];
    } else if (lowerMessage.includes('underwriting')) {
      response = this.mockResponses['underwriting'];
    } else if (lowerMessage.includes('guidelines')) {
      response = this.mockResponses['guidelines'];
    } else if (lowerMessage.includes('workflow')) {
      response = this.mockResponses['workflow'];
    } else {
      // Default response
      response = this.mockResponses['default'].replace('{query}', message);
    }
    
    // Simulate network delay
    return of(response).pipe(delay(1500));
  }
}
