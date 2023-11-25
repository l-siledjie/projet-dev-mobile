import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpruntPage } from './emprunt.page';

describe('EmpruntPage', () => {
  let component: EmpruntPage;
  let fixture: ComponentFixture<EmpruntPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpruntPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
