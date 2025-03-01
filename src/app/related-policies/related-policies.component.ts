import { Component, OnInit } from '@angular/core';

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
  selector: 'app-related-policies',
  templateUrl: './related-policies.component.html',
  styleUrls: ['./related-policies.component.scss']
})
export class RelatedPoliciesComponent implements OnInit {
  displayedColumns: string[] = [
    'policy',
    'status',
    'insured',
    'issuedDate',
    'businessName',
    'taxId',
    'category',
    'previousPOIFlag',
    'auditPOI'
  ];

  businessPolicies: BusinessPolicy[] = [
    {
      policy: '5000000001',
      status: 'Active',
      insured: 'John Smith',
      issuedDate: '01/15/2023',
      businessName: 'Smith Enterprises LLC',
      taxId: '12-3456789',
      category: 'Key Person',
      previousPOIFlag: 'Yes',
      auditPOI: 'No'
    },
    {
      policy: '5000000002',
      status: 'Pending',
      insured: 'Jane Doe',
      issuedDate: '03/22/2023',
      businessName: 'Doe Consulting Inc',
      taxId: '98-7654321',
      category: 'Buy-Sell',
      previousPOIFlag: 'No',
      auditPOI: 'Yes'
    },
    {
      policy: '5000000003',
      status: 'Active',
      insured: 'Robert Johnson',
      issuedDate: '11/05/2022',
      businessName: 'Johnson & Associates',
      taxId: '45-6789123',
      category: 'Executive Bonus',
      previousPOIFlag: 'Yes',
      auditPOI: 'Yes'
    },
    {
      policy: '5000000004',
      status: 'Lapsed',
      insured: 'Sarah Williams',
      issuedDate: '06/30/2022',
      businessName: 'Williams Group LLC',
      taxId: '78-9123456',
      category: 'Key Person',
      previousPOIFlag: 'No',
      auditPOI: 'No'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
