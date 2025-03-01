import { Component, OnInit } from '@angular/core';

export interface PolicyData {
  policyNumber: string;
  applicantName: string;
  status: string;
  type: string;
  effectiveDate: Date;
}

@Component({
  selector: 'app-related-policies',
  templateUrl: './related-policies.component.html',
  styleUrls: ['./related-policies.component.scss']
})
export class RelatedPoliciesComponent implements OnInit {
  displayedColumns: string[] = ['policyNumber', 'applicantName', 'status', 'type', 'effectiveDate'];
  
  dataSource: PolicyData[] = [
    {
      policyNumber: 'POL-2024-001',
      applicantName: 'John Smith',
      status: 'Active',
      type: 'Term Life',
      effectiveDate: new Date('2024-01-15')
    },
    {
      policyNumber: 'POL-2024-002',
      applicantName: 'Jane Doe',
      status: 'Pending',
      type: 'Whole Life',
      effectiveDate: new Date('2024-02-01')
    },
    {
      policyNumber: 'POL-2023-125',
      applicantName: 'John Smith',
      status: 'Active',
      type: 'Universal Life',
      effectiveDate: new Date('2023-12-10')
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
