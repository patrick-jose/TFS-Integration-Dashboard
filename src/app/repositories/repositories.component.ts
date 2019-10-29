import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit {

  repositories: object;
  threeUsers: object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getRepositories().subscribe(data => {
      this.repositories = data;
    });
  }

  clickRepo(repo: string, repoName: string) {
    this.data.sendChosenRepo(repo);
    this.data.sendChosenRepoName(repoName);
  }
}
