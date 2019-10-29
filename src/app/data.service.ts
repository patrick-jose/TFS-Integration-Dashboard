import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  repo: string;
  repoName: string;
  tfsIntegrationApi: string = environment.TFS_INTEGRATION_API;

  constructor(private http: HttpClient) { }

  sendChosenRepo(repo: string) {
    this.repo = repo;
  }

  sendChosenRepoName(repoName: string) {
    this.repoName = repoName;
  }

  receiveChosenRepo() {
    return this.repo;
  }

  receiveChosenRepoName() {
    return this.repoName;
  }

  getPullRequests() {
    return this.http.get(`${this.tfsIntegrationApi}/pullrequests`);
  }

  getPullRequestsByRepo() {
    if (this.repo != undefined)
      return this.http.get(`${this.tfsIntegrationApi}/pullrequests/repo/${this.repo}`);
  }

  getRepositories() {
    return this.http.get(`${this.tfsIntegrationApi}/repos`);
  }

  getPullRequestDataChart() {
    return this.http.get(`${this.tfsIntegrationApi}/pullrequests/getPullRequestDataChart`);
  }

  getPullRequestByRepoDataChart() {
    if (this.repo != undefined)
      return this.http.get(`${this.tfsIntegrationApi}/pullrequests/getPullRequestByRepoDataChart/${this.repo}`);
  }
}
