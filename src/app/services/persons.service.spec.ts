import {
  HttpModule,
  XHRBackend,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { personsService } from './persons.service';

xdescribe('personsService', () => {
  const apiUrl = 'http://localhost:3000/persons';
  let service: personsService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        personsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(personsService);
    mockBackend = TestBed.get(XHRBackend);
  });

  it('should get the list of persons from the server', () => {
    const testpersons = [
      {
        id: 1,
        name: 'p1'
      },
      {
        id: 2,
        name: 'p2'
      },
      {
        id: 3,
        name: 'p3'
      }
    ];

    // Arrange
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toBe(apiUrl);

      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: testpersons
          })
        )
      );
    });

    // Act
    service.getpersons().subscribe(persons => {
      expect(persons.length).toEqual(3);
      expect(persons[0].firstName).toEqual('p1');
      expect(persons[1].firstName).toEqual('p2');
      expect(persons[2].firstName).toEqual('p3');
    });
  });
});
