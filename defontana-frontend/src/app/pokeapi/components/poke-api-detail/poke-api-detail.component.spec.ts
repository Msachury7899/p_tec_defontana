import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeApiDetailComponent } from './poke-api-detail.component';

describe('PokeApiDetailComponent', () => {
  let component: PokeApiDetailComponent;
  let fixture: ComponentFixture<PokeApiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeApiDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeApiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
