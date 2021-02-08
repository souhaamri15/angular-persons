import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { personFormComponent } from './person-form.component';
import { personsService } from '../services/persons.service';

xdescribe('personFormComponent', () => {
  let fixture: ComponentFixture<personFormComponent>;
  let component: personFormComponent;
  let service: personsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [personFormComponent],
      imports: [FormsModule, HttpModule, RouterTestingModule],
      providers: [personsService]
    });

    fixture = TestBed.createComponent(personFormComponent);
    component = fixture.componentInstance;

    // Get service instance if registered with providers array of module
    service = TestBed.get(personsService);

    // Get service instance if registered with providers array within the component
    // service = fixture.debugElement.injector.get(personsService);
  });

  it(
    'should show person details for a particular person',
    async(() => {
      const person = {
        id: 1,
        firstName: 'matt',
        lastName: 'gary',
        email: 'matt@gmail.com'
      };

      component.person = person;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const firstNameElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#personFirstName')
        ).nativeElement;
        const lastNameElement: HTMLTextAreaElement = fixture.debugElement.query(
          By.css('#personLastName')
        ).nativeElement;
        const emailElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#personEmail')
        ).nativeElement;

        expect(firstNameElement.value).toContain(person.firstName);
        expect(lastNameElement.value).toContain(person.lastName);
        expect(emailElement.value).toContain(person.email);
      });
    })
  );

  it('should save person details when form is submitted', () => {
    component.addNew = true;
    const spy = spyOn(service, 'addperson').and.returnValue(
      Observable.empty()
    );

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(spy).toHaveBeenCalled();
  });
});
