import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Observable } from 'rxjs/rx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { personsComponent } from './persons.component';
import { personsService } from '../services/persons.service';
import { person } from '../models/person';

xdescribe('personsComponent (async)', () => {
  let fixture: ComponentFixture<personsComponent>;
  let component: personsComponent;
  let service: personsService;
  let testpersons: person[];

  beforeEach(() => {
    testpersons = [
      {
        id: 1,
        firstName: "james",
        lastName: "smith",
        email: "james@gmail.com"
      },
      {
        id: 2,
        firstName: "sam",
        lastName: "brown",
        email: "sam@abc.xyz"
      },
      {
        id: 3,
        firstName : "yara",
        lastName : "white",
        email: "ya@abc.xyz"
      },
      {
        id: 4,
        firstName: "Amar",
        lastName: "2244668800",
        email: "amar@abc.xyz"
      }
    ];

    TestBed.configureTestingModule({
      declarations: [personsComponent],
      imports: [RouterTestingModule, HttpModule],
      providers: [personsService]
    });

    fixture = TestBed.createComponent(personsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(personsService);
  });

  it('should set persons property with the items returned from the server (Observable)', () => {
    spyOn(service, 'getpersons').and.returnValue(
      Observable.from([testpersons])
    );

    fixture.detectChanges();

    expect(component.persons).toEqual(testpersons);
  });

  xit(
    'should set persons property with the items returned from the server (Promise, async, whenStable)',
    async(() => {
      spyOn(service, 'getpersonsPromise').and.returnValue(
        Promise.resolve(testpersons)
      );

      fixture.detectChanges();

      fixture
        .whenStable()
        .then(() => expect(component.persons).toEqual(testpersons));
    })
  );

  xit(
    'should set persons property with the items returned from the server (Promise, fakeAsync, tick)',
    fakeAsync(() => {
      spyOn(service, 'getpersonsPromise').and.returnValue(
        Promise.resolve(testpersons)
      );

      fixture.detectChanges();

      tick();
      expect(component.persons).toEqual(testpersons);
    })
  );
});
