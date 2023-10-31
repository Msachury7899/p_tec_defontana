import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeApiMainContainerComponent } from './poke-api-main-container.component';

describe('PokeApiMainContainerComponent', () => {
  let component: PokeApiMainContainerComponent;
  let fixture: ComponentFixture<PokeApiMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeApiMainContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeApiMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
