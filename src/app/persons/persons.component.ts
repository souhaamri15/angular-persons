import { Component, OnInit } from '@angular/core';

import { person } from '../models/person';
import { personsService } from '../services/persons.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class personsComponent implements OnInit {
  persons: person[] = [];
  error: AppError;

  constructor(private service: personsService) {}

  ngOnInit() {
    this.service.getpersons().subscribe(
      (persons: person[]) => {
        console.log('Success! Get persons Successful! (via Observable)');
        this.persons = persons;
      },
      (error: AppError) => {
        this.error = error;
        console.log(
          'Failed! Error occurred when getting persons. (via Observable)',
          error
        );
      }
    );
  }

  xngOnInit() {
    this.service
      .getpersonsPromise()
      .then((persons: person[]) => {
        console.log('Success! Get persons Successful! (via Promise)');
        this.persons = persons;
      })
      .catch((error: AppError) => {
        this.error = error;
        console.log(
          'Failed! Error occurred when getting persons. (via Promise)',
          error
        );
      });
  }

  onDelete(personId) {
    if (confirm('Are you sure?')) {
      this.service.deleteperson(personId).subscribe(
        () => {
          console.log('Success! Delete person Successful!');
          this.persons = this.persons.filter(
            person => person.id !== personId
          );
        },
        (error: AppError) => {
          this.error = error;
          console.log('Failed! Error occurred when deleting person.', error);
        }
      );
    }
  }
}
