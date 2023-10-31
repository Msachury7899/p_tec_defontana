import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeApiInfoComponent } from './poke-api-info.component';

describe('PokeApiInfoComponent', () => {
  let component: PokeApiInfoComponent;
  let fixture: ComponentFixture<PokeApiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeApiInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeApiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
