import { Component, OnInit } from '@angular/core';

interface PolicyDate {
  label: string;
  value: string;
}

interface SignatureDate {
  label: string;
  value: string;
}

interface CycleTimeDate {
  label: string;
  value: string;
}

@Component({
  selector: 'app-policy-dates',
  templateUrl: './policy-dates.component.html',
  styleUrls: ['./policy-dates.component.scss']
})
export class PolicyDatesComponent implements OnInit {
  policyDates: PolicyDate[] = [
    { label: 'Effective date', value: 'N/A' },
    { label: 'Final Decision date', value: 'N/A' },
    { label: 'Acceptance date', value: 'N/A' },
    { label: 'Payment date', value: 'N/A' },
    { label: 'Offer Expiry date', value: 'N/A' },
    { label: 'Insurance Age Change date', value: 'N/A' },
    { label: 'Policy Issue date', value: 'N/A' }
  ];

  proposedInsuredDates: SignatureDate[] = [
    { label: 'First Sign Date', value: 'N/A' },
    { label: 'Last Sign Date', value: 'Pending Signature' }
  ];

  policyOwnerDates: SignatureDate[] = [
    { label: 'First Sign Date', value: 'Same as Proposed Insured' },
    { label: 'Last Sign Date', value: 'Same as Proposed Insured' }
  ];

  cycleTimeDates: CycleTimeDate[] = [
    { label: 'First Evidence Card Created', value: 'Jan 17, 2025' },
    { label: 'Cycle Time Deadline', value: 'Mar 18, 2025 (60 days)' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic can go here
  }
}
