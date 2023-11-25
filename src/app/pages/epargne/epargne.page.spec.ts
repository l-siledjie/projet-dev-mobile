import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpargnePage } from './epargne.page';

describe('EpargnePage', () => {
  let component: EpargnePage;
  let fixture: ComponentFixture<EpargnePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EpargnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
