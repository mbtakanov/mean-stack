import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public form: FormGroup;
  public issue: Issue;

  constructor(private issueService: IssueService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.issueService.getIssueById(params.id).subscribe((issue: any) => {
        this.issue = issue;
        this.form.get('id').setValue(this.issue._id);
        this.form.get('title').setValue(this.issue.title);
        this.form.get('responsible').setValue(this.issue.responsible);
        this.form.get('description').setValue(this.issue.description);
        this.form.get('severity').setValue(this.issue.severity);
        this.form.get('status').setValue(this.issue.status);
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      id: '',
      title: ['', [Validators.required, Validators.min(5), Validators.max(100)]],
      responsible: ['', [Validators.required, Validators.min(5), Validators.max(100)]],
      description: ['', [Validators.required, Validators.min(5), Validators.max(200)]],
      severity: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  updateIssue() {
    this.issueService.updateIssue(this.form.value).subscribe(data => {
      this.snackBar.open('Issue update successfully.', 'OK', {
        duration: 3000
      });

      this.router.navigate(['/list']);
    });
  }
}
