import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newIssue: Issue;
  form: FormGroup;
  severities: string[] = ['High','Medium','Low'];
  statuses: string[] = ['Open','Closed'];
  defaultSeverity: string = "High";
  defaultStatus: string = "Open";

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      severity: new FormControl(null),
      status: new FormControl(null)
    });
    this.form.controls['severity'].setValue(this.defaultSeverity,{onlySelf: true});
    this.form.controls['status'].setValue(this.defaultStatus,{onlySelf: true});
    };

  onSubmit() {
    this.newIssue = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      severity: this.form.get('severity').value,
      status: this.form.get('status').value
    };
    this.addIssue(this.newIssue);
  };

  addIssue(issue: Issue) {
    this.issueService
      .createIssue(issue)
      .subscribe( () => {
        console.log("Issue Created Successfully!!");
      });
  }

}
