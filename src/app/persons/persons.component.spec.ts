import { personsComponent } from './persons.component';
import { personsService } from '../services/persons.service';
import { person } from '../models/person';
import { AppError } from '../common/app-error';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

xdescribe('personsComponent', () => {
  let component: personsComponent;
  let service: personsService;

  beforeEach(() => {
    service = new personsService(null);
    component = new personsComponent(service);
  });

  it('should set persons property with the items returned from the server', () => {
    // Arrange - Setup
    const persons: person[] = [
      {
        id: 1,
        firstName: 'tom',
        lastName: 'tom',
        email: 'tom@gmail.com'
      },
      {
        id: 2,
        firstName: 'tam',
        lastName: 'tam',
        email: 'tam@gmail.com'
      },
      {
        id: 3,
        firstName: 'tim',
        lastName: 'tim',
        email: 'tim@gmail.com'
      }
    ];

    spyOn(service, 'getpersons').and.callFake(() => {
      return Observable.from([persons]);
    });

    // spyOn(service, 'getpersons').and.returnValue(Observable.from([persons]));

    // Act - Make the actual call
    component.ngOnInit();

    // Assert - Check and report whether the test is pass or fail
    expect(component.persons).toEqual(persons);
  });

  it('should set the error property if server returns an error when getting persons', () => {
    const error = new AppError('server error');
    spyOn(service, 'getpersons').and.returnValue(Observable.throw(error));

    expect(component.error).not.toBeDefined();

    component.ngOnInit();

    expect(component.error).toBeDefined();
    expect(component.error.originalError).toEqual('server error');
  });

  it('should call the server to delete a person if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'deleteperson').and.returnValue(
      Observable.empty()
    );

    const personId = 1;
    component.onDelete(personId);

    expect(spy).toHaveBeenCalledWith(personId);
  });

  it('should NOT call the server to delete a person if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'deleteperson').and.returnValue(
      Observable.empty()
    );

    const personId = 1;
    component.onDelete(personId);

    expect(spy).not.toHaveBeenCalledWith(personId);
  });

  it('should delete the person from the persons array within the component', () => {
    component.persons = [
      {
        id: 1,
        firstName: 'tom',
        lastName: 'tom',
        email: 'tom@gmail.com'
      },
      {
        id: 2,
        firstName: 'tam',
        lastName: 'tam',
        email: 'tam@gmail.com'
      }
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'deleteperson').and.returnValue(
      Observable.from([null])
    );

    const personId = 2;
    component.onDelete(personId);

    const index = component.persons.findIndex(
      person => person.id === personId
    );
    expect(index).toBeLessThan(0);
  });
});
