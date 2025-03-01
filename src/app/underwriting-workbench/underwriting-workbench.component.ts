import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditModeModalComponent } from '../shared/edit-mode-modal/edit-mode-modal.component';

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

@Component({
  selector: 'app-underwriting-workbench',
  templateUrl: './underwriting-workbench.component.html',
  styleUrls: ['./underwriting-workbench.component.scss']
})
export class UnderwritingWorkbenchComponent {
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

  workboardItems = [
    'Applicant & Underwriting',
    'Product',
    'Advisor',
    'Bene/Owner/Payor',
    'Associated Policies',
    'Related Business Policies',
    'Save Age',
    'Policy Dates',
    'PIA - Post Issue APS'
  ];

  isEditMode = false;

  constructor(private dialog: MatDialog) {}

  onEditModeChange(enabled: boolean) {
    if (enabled) {
      const dialogRef = this.dialog.open(EditModeModalComponent, {
        width: '500px',
        disableClose: true
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
} 