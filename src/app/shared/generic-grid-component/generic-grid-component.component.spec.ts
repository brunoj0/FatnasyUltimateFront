import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericGridComponentComponent } from './generic-grid-component.component';

describe('GenericGridComponentComponent', () => {
  let component: GenericGridComponentComponent;
  let fixture: ComponentFixture<GenericGridComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericGridComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericGridComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
