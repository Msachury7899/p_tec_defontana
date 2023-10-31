import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeApiTableComponent } from './poke-api-table.component';

describe('PokeApiTableComponent', () => {
  let component: PokeApiTableComponent;
  let fixture: ComponentFixture<PokeApiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeApiTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeApiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
