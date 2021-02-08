import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { person } from '../models/person';
import { personsService } from '../services/persons.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class personFormComponent implements OnInit {
  id: number;
  person: person;
  addNew: boolean;
  @ViewChild('f') personForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: personsService
  ) {
    this.person = new person();
    this.addNew = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.service.getperson(this.id).subscribe(
          (person: person) => {
            console.log('Success! Get person Successful!');
            this.person = person;
            this.addNew = false;
          },
          (error: AppError) => {
            console.log('Failed! Error occurred when getting person.', error);
          }
        );
      }
    });
  }

  onSubmit() {
    this.person.firstName = this.personForm.value.firstNname;
    this.person.lastName = this.personForm.value.lastName;
    this.person.email = this.personForm.value.email;

    if (this.addNew) {
      this.service.addperson(this.person).subscribe(
        (person: person) => {
          console.log('Success! Add person successful.', person);
          this.router.navigate(['/persons']);
        },
        (error: AppError) => {
          console.log('Failed! Error occurred while adding a person.', error);
        }
      );
    } else {
      this.service.updateperson(this.id, this.person).subscribe(
        (person: person) => {
          console.log('Success! Update person successful.', person);
          this.router.navigate(['/persons']);
        },
        (error: AppError) => {
          console.log(
            'Failed! Error occurred while updating a person.',
            error
          );
        }
      );
    }
  }
}
