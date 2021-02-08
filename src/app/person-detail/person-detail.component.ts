import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { person } from '../models/person';
import { personsService } from '../services/persons.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class personDetailComponent implements OnInit {
  person: person = new person();
  id: number;

  constructor(
    private service: personsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];

      if (isNaN(this.id) || !this.id) {
        console.log(
          `person id is not a number (or) is 0. (id = ${params['id']})`
        );
        this.router.navigate(['/not-found']);
        return;
      }

      this.service.getperson(this.id).subscribe(
        (person: person) => {
          console.log('Success! Get person Successful!');
          this.person = person;
        },
        (error: AppError) => {
          console.log('Failed! Error occurred when getting person.', error);
        }
      );
    });
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.service.deleteperson(this.id).subscribe(
        () => {
          console.log('Success! Delete person Successful!');
          this.router.navigate(['/persons']);
        },
        (error: AppError) => {
          console.log('Failed! Error occurred when deleting person.', error);
        }
      );
    }
  }

  onEdit() {
    this.router.navigate(['/persons', this.id, 'edit']);
  }
}
