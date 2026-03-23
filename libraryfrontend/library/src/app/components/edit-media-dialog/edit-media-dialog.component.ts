import { Component, Inject } from '@angular/core';
import { Media } from '../../models/media.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-media-dialog',
  templateUrl: './edit-media-dialog.component.html',
  styleUrl: './edit-media-dialog.component.scss'
})
export class EditMediaDialogComponent {

constructor(
  public dialogRef: MatDialogRef<EditMediaDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Media,
) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


