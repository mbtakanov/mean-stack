import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public issues: Issue[];
  public dataSource;
  public displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router) {
    this.issues = [];
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    this.issueService.getIssues().subscribe((issues: any) => {
      this.issues = issues;
      this.dataSource = new MatTableDataSource(this.issues);
    });
  }

  edit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  delete(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.getIssues();
    });
  }
}
