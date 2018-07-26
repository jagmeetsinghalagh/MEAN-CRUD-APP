import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Issue } from '../models/Issue';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'});
}

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get all the issues from the endpoint
  getIssues():Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.uri}/issues`);
  };

  // Get single issue from the endpoint
  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.uri}/${id}`);
  };

  // create an issue
  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.uri}/create`,issue,httpOptions);
  };

  // Update an issue
  updIssue(id: string,issue: Issue) {
    return this.http.post(`${this.uri}/update/${id}`,issue,httpOptions);
  };

  // Delete an issue
  delIssue(id: string) {
    return this.http.delete(`${this.uri}/delete/${id}`);
  };


}


