import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditModeModalComponent } from '../shared/edit-mode-modal/edit-mode-modal.component';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface BusinessPolicy {
  policy: string;
  status: string;
  insured: string;
  issuedDate: string;
  businessName: string;
  taxId: string;
  category: string;
  previousPOIFlag: string;
  auditPOI: string;
}

interface NavItem {
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-underwriting-workbench',
  templateUrl: './underwriting-workbench.component.html',
  styleUrls: ['./underwriting-workbench.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
        padding: '0 1.5rem',
        transform: 'translateY(-10px)',
        borderTop: '0px solid transparent'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        overflow: 'hidden',
        padding: '1.5rem',
        transform: 'translateY(0)',
        borderTop: '1px solid var(--border-color)'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class UnderwritingWorkbenchComponent implements OnInit, AfterViewInit {
  applicationId = '5000000055';
  applicantName = 'John Smith';
  amount = '$500,000';
  gender = 'Male';
  age = 35;
  product = 'OPTerm 35';
  applicationNumber = '1000010521';
  applicationMethod = 'Digital';
  assignedUW = 'Auto Underwriter';
  totalFaceAmount = '$500,000';
  status = 'RUW - Standard Plus';
  reason = 'Your anxiety and sleep apnea.';

  displayedColumns: string[] = ['policy', 'status', 'insured', 'issuedDate', 'businessName', 'taxId', 'category', 'previousPOIFlag', 'auditPOI'];
  businessPolicies: BusinessPolicy[] = [
    {
      policy: '5000123491',
      status: 'Active',
      insured: 'First',
      issuedDate: '1/29/2024',
      businessName: 'LGA',
      taxId: '123456789',
      category: 'Primary Beneficiary',
      previousPOIFlag: 'No',
      auditPOI: 'No'
    },
    {
      policy: '5000123492',
      status: 'Terminated',
      insured: 'Second',
      issuedDate: 'NA',
      businessName: 'LGA',
      taxId: '123456789',
      category: 'Contingent Beneficiary',
      previousPOIFlag: 'No',
      auditPOI: 'No'
    },
    {
      policy: '5000123493',
      status: 'Pending',
      insured: 'Third',
      issuedDate: 'NA',
      businessName: 'LGA',
      taxId: '123456789',
      category: 'Owner',
      previousPOIFlag: 'No',
      auditPOI: 'No'
    },
    {
      policy: '5000123494',
      status: 'Pending',
      insured: 'Last',
      issuedDate: 'NA',
      businessName: 'LGA',
      taxId: '123456789',
      category: 'Purpose of Insurance',
      previousPOIFlag: 'No',
      auditPOI: 'No'
    }
  ];

  workboardItems: NavItem[] = [
    { name: 'Workboard', route: 'workboard', icon: 'dashboard' },
    { name: 'Applicant & Underwriting', route: 'applicant', icon: 'person' },
    { name: 'Product', route: 'product', icon: 'inventory_2' },
    { name: 'Advisor', route: 'advisor', icon: 'support_agent' },
    { name: 'Bene/Owner/Payor', route: 'beneficiary', icon: 'people' },
    { name: 'Associated Policies', route: 'associated-policies', icon: 'policy' },
    { name: 'Related Business Policies', route: 'related-business-policies', icon: 'business' },
    { name: 'Save Age', route: 'save-age', icon: 'event' },
    { name: 'Policy Dates', route: 'policy-dates', icon: 'date_range' },
    { name: 'PIA - Post Issue APS', route: 'post-issue', icon: 'description' }
  ];

  isEditMode = false;
  isNavCollapsed = false;
  isHeaderCollapsed = false;
  isRedesignedDetailsCollapsed = false;
  activeRoute = 'workboard';

  @ViewChild('leftIndicator') leftIndicator!: ElementRef;
  @ViewChild('rightIndicator') rightIndicator!: ElementRef;
  @ViewChild('trackerSteps') trackerSteps!: ElementRef;
  @ViewChild('trackerLeftIndicator') trackerLeftIndicator!: ElementRef;
  @ViewChild('trackerRightIndicator') trackerRightIndicator!: ElementRef;

  canScrollLeft = false;
  canScrollRight = false;
  canScrollTrackerLeft = false;
  canScrollTrackerRight = false;
  private scrollAmount = 200;
  private trackerScrollAmount = 300;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    // Track route changes to update active navigation
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const urlParts = event.url.split('/');
      if (urlParts.length > 2) {
        this.activeRoute = urlParts[2];
      }
    });

    // Set initial active route
    const urlParts = this.router.url.split('/');
    if (urlParts.length > 2) {
      this.activeRoute = urlParts[2];
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupScrollIndicators();
    }, 100);
    
    // Setup scroll indicators for the tracker
    this.setupTrackerScrollIndicators();
    
    // Listen for window resize to update indicators
    window.addEventListener('resize', () => {
      this.setupScrollIndicators();
      this.setupTrackerScrollIndicators();
    });
  }

  onEditModeChange(enabled: boolean) {
    if (enabled) {
      const dialogRef = this.dialog.open(EditModeModalComponent, {
        width: '500px',
        disableClose: true,
        panelClass: 'edit-mode-dialog-panel'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isEditMode = true;
          // Here you can handle the form data (result.role, result.reason, result.comments)
        }
      });
    } else {
      // Handle exit edit mode - could show another dialog for exit comments
      this.isEditMode = false;
    }
  }

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  toggleHeader() {
    this.isHeaderCollapsed = !this.isHeaderCollapsed;
  }

  toggleRedesignedDetails(): void {
    this.isRedesignedDetailsCollapsed = !this.isRedesignedDetailsCollapsed;
    
    // Removed the auto-scroll behavior to maintain user's scroll position
  }

  navigateTo(route: string) {
    this.activeRoute = route;
    this.router.navigate(['/underwriting', route]);
  }

  /**
   * Returns a shorter name for mobile navigation items
   */
  getMobileNavName(fullName: string): string {
    const shortNames: {[key: string]: string} = {
      'Workboard': 'Board',
      'Applicant & Underwriting': 'Applicant',
      'Product': 'Product',
      'Advisor': 'Advisor',
      'Bene/Owner/Payor': 'Bene/Owner',
      'Associated Policies': 'Assoc Pol',
      'Related Business Policies': 'Business',
      'Save Age': 'Save Age',
      'Policy Dates': 'Dates',
      'PIA - Post Issue APS': 'PIA'
    };
    
    return shortNames[fullName] || fullName;
  }
  
  scrollLeft() {
    const scrollContainer = document.querySelector('.tab-scroll-container') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -this.scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  scrollRight() {
    const scrollContainer = document.querySelector('.tab-scroll-container') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: this.scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  setupScrollIndicators() {
    const scrollContainer = document.querySelector('.tab-scroll-container') as HTMLElement;
    if (!scrollContainer || !this.leftIndicator || !this.rightIndicator) return;
    
    const updateIndicators = () => {
      this.canScrollLeft = scrollContainer.scrollLeft > 20;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth - 20;
      this.canScrollRight = scrollContainer.scrollLeft < maxScrollLeft;
    };
    
    updateIndicators();
    scrollContainer.addEventListener('scroll', updateIndicators);
    window.addEventListener('resize', updateIndicators);
  }

  scrollTrackerLeft() {
    if (this.trackerSteps && this.trackerSteps.nativeElement) {
      const container = this.trackerSteps.nativeElement;
      container.scrollLeft -= this.trackerScrollAmount;
      setTimeout(() => this.updateTrackerScrollIndicators(), 300);
    }
  }

  scrollTrackerRight() {
    if (this.trackerSteps && this.trackerSteps.nativeElement) {
      const container = this.trackerSteps.nativeElement;
      container.scrollLeft += this.trackerScrollAmount;
      setTimeout(() => this.updateTrackerScrollIndicators(), 300);
    }
  }

  setupTrackerScrollIndicators() {
    if (this.trackerSteps && this.trackerSteps.nativeElement) {
      const container = this.trackerSteps.nativeElement;
      
      // Initial check
      this.updateTrackerScrollIndicators();
      
      // Add scroll event listener
      container.addEventListener('scroll', () => {
        this.updateTrackerScrollIndicators();
      });
    }
  }

  updateTrackerScrollIndicators() {
    if (this.trackerSteps && this.trackerSteps.nativeElement) {
      const container = this.trackerSteps.nativeElement;
      
      // Check if can scroll left
      this.canScrollTrackerLeft = container.scrollLeft > 0;
      
      // Check if can scroll right
      this.canScrollTrackerRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 5);
    }
  }
} 