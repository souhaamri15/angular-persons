import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { person } from '../models/person';
import { AppError } from '../common/app-error';
import {enableProdMode} from '@angular/core';

enableProdMode();
@Injectable()
export class personsService {
  private apiUrl = 'http://localhost:3000/persons';
  private persons: person[] = [];

  constructor(private http: Http) {}

  getpersons(): Observable<person[]> {
    return this.http
      .get(this.apiUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getpersonsPromise(): Promise<person[]> {
    return this.http
      .get(this.apiUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError)
      .toPromise();
  }

  getperson(id: number) {
    return this.http
      .get(`${this.apiUrl}/${id}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addperson(person: person) {
    return this.http
      .post(this.apiUrl, person)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateperson(id: number, person: person) {
    return this.http
      .patch(`${this.apiUrl}/${id}`, person)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteperson(id: number) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
