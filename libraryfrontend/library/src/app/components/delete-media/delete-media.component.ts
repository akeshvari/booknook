import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Media } from '../../models/media.model';
import { MediaService } from '../../services/media.service';
import { Observable } from "rxjs";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-media',
  templateUrl: './delete-media.component.html',
  styleUrl: './delete-media.component.scss'
})
export class DeleteMediaComponent {

  @Output() mediaDeleted: EventEmitter<string> = new EventEmitter();

  @Input() mediaTitle! : string;

  constructor(private mediaService: MediaService) {}

  deleteMedia(): void {
    this.mediaService.deleteMedia(this.mediaTitle).subscribe({next: () => this.mediaDeleted.emit(this.mediaTitle)});
  }

}
