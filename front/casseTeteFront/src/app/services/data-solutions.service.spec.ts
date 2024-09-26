import { TestBed } from '@angular/core/testing';

import { DataSolutionsService } from './data-solutions.service';

describe('DataSolutionsService', () => {
  let service: DataSolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
