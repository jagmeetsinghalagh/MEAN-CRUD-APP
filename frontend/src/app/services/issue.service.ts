import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

import { Issue } from '../models/Issue';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private uri = 'http://localhost:3000';

  private issueSource = new BehaviorSubject<Issue>({
    _id: null,
    title: null,
    description: null,
    severity: null,
    status: null
  });
  selectedIssue = this.issueSource.asObservable();

  constructor(private http: HttpClient) { }

  // Get all the issues from the endpoint
  getIssues():Observable<any> {
    return this.http.get<any>(`${this.uri}/issues`);
  };

  // Get single issue from the endpoint
  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.uri}/${id}`);
  };

  // create an issue
  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.uri}/issues/create`,issue,httpOptions);
  };

  // Update an issue
  updIssue(issue: Issue) {
    var id = issue._id;
    return this.http.post(`${this.uri}/issues/update/${id}`,issue,httpOptions);
  };

  // Delete an issue
  delIssue(id: string) {
    return this.http.delete(`${this.uri}/issues/delete/${id}`);
  };

  setFormLog(issue: Issue) {
    this.issueSource.next(issue);
  }


}


