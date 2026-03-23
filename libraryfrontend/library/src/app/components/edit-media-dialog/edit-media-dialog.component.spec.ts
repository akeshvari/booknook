import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMediaDialogComponent } from './edit-media-dialog.component';

describe('EditMediaDialogComponent', () => {
  let component: EditMediaDialogComponent;
  let fixture: ComponentFixture<EditMediaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMediaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
