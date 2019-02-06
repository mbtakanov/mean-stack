import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private uri: string;
  private headers: any;

  constructor(private http: HttpClient) {
    this.uri  = 'http://localhost:4000';
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getIssues() {
    return this.http.get(`${this.uri}/issues`, this.headers);
  }

  getIssueById(id: number) {
    return this.http.get(`${this.uri}/issues/${id}`, this.headers);
  }


  addIssue(issue) {
    return this.http.post(`${this.uri}/issues/add`, issue, this.headers);
  }

  updateIssue(issue) {
    return this.http.put(`${this.uri}/issues/update/${issue.id}`, issue, this.headers);
  }

  deleteIssue(id) {
    return this.http.delete(`${this.uri}/issues/delete/${id}`, this.headers);
  }
}
