import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[] = [];
  

  constructor( private issueService: IssueService) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe( (issuesArray) => {
        for( let issue of issuesArray.issues) {
          this.issues.push(issue);
        }
      });
  };

  updateIssue(issue: Issue) {
    this.issueService.setFormLog(issue);
  }

  deleteIssue(issue: Issue) {
    var id = issue._id; 
    console.log(id);
    this.issueService
      .delIssue(id)
      .subscribe( () => {
        console.log("Issue Deleted Successfully!!!");        
      });

  };

}
