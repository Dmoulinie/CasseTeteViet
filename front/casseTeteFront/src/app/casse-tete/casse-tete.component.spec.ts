import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasseTeteComponent } from './casse-tete.component';

describe('CasseTeteComponent', () => {
  let component: CasseTeteComponent;
  let fixture: ComponentFixture<CasseTeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasseTeteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasseTeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
