import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Subject } from 'rxjs/rx';

import { personDetailComponent } from './person-detail.component';
import { personsService } from '../services/persons.service';

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

xdescribe('personDetailComponent', () => {
  let fixture: ComponentFixture<personDetailComponent>;
  let component: personDetailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [personDetailComponent],
      providers: [
        personsService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    });

    fixture = TestBed.createComponent(personDetailComponent);
    component = fixture.componentInstance;
  });

  it('should show person details for a particular person', () => {
    component.person = {
      id: 1,
      firstName: 'matt',
      lastName: 'tom',
      email: 'matt@gmail.com'
    };

    fixture.detectChanges();

    const firstNameElement: HTMLElement = fixture.debugElement.query(
      By.css('.panel-title')
    ).nativeElement;
    const lastNameElement: HTMLElement = fixture.debugElement.query(
      By.css('#lastName')
    ).nativeElement;
    const emailElement: HTMLElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;

    expect(firstNameElement.innerText).toContain('matt');
    expect(lastNameElement.innerText).toContain('tom');
    expect(emailElement.innerText).toContain('matt@gmail.com');
  });

  it('should redirect the user to `person Form` component when Edit button is clicked', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.id = 1;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#edit'));
    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['/persons', component.id, 'edit']);
  });

  it('should navigate the user to the `Not Found` component when an invalid person id is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 'abc' });

    expect(spy).toHaveBeenCalledWith(['/not-found']);
  });
});
