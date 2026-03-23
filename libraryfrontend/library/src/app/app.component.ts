import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Media } from './models/media.model';
import { MediasComponent } from './components/medias/medias.component';
import { AddMediaComponent } from './components/add-media/add-media.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { Result } from "@zxing/library";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Library';

  @ViewChild(MediasComponent) mediasComponent!: MediasComponent;

  onMediaAdded(media : Media) {
    this.mediasComponent.addMediaToList(media);
  }
}
