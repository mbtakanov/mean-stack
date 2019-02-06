import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public form: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.min(5), Validators.max(100)]],
      responsible: ['', [Validators.required, Validators.min(5), Validators.max(100)]],
      description: ['', [Validators.required, Validators.min(5), Validators.max(200)]],
      severity: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  addIssue() {
    this.issueService.addIssue(this.form.value).subscribe(data => {
      this.router.navigate(['/list']);
    });
  }
}
