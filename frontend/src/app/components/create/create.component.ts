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

  severity: string[] = ['High','Medium','Low'];
  status: string[] = ['Open','Closed'];
  form: FormGroup;

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      severity: new FormControl(''),
      status: new FormControl('')
    });
  };

  addIssue(issue: Issue) {
    this.issueService
      .createIssue(issue)
      .subscribe( (issue) => {
        console.log(issue);
      })
  };

}
