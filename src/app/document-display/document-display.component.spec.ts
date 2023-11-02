import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDisplayComponent } from './document-display.component';

describe('DocumentDisplayComponent', () => {
  let component: DocumentDisplayComponent;
  let fixture: ComponentFixture<DocumentDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentDisplayComponent],
    });
    fixture = TestBed.createComponent(DocumentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
