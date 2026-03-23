import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMediaDialogComponent } from '../edit-media-dialog/edit-media-dialog.component';
import { Media } from '../../models/media.model';
import "primeng/resources/themes/bootstrap4-light-purple/theme.css";
import "primeng/resources/primeng.css";
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrl: './edit-media.component.scss'
})
export class EditMediaComponent {

  @Input() media!: Media;

  @Output() mediaEdited: EventEmitter<Media> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  editMedia(): void {
    const dialogRef = this.dialog.open(EditMediaDialogComponent, {
      data: {
        author: this.media.author,
        genre: this.media.genre,
        mediatype: this.media.mediatype,
        publicationdate: this.media.publicationdate,
        rating: this.media.rating,
        image: this.media.image,
        description: this.media.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.media.author = result.author;
      this.media.genre = result.genre;
      this.media.mediatype = result.mediatype;
      this.media.publicationdate = result.publicationdate;
      this.media.rating = result.rating;
      this.media.image = result.image;
      this.media.description = result.description;
      this.mediaEdited.emit(this.media);
    });
  }

}

