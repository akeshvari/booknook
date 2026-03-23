import { Component, Output, EventEmitter, ViewChild, OnInit, ElementRef} from '@angular/core';
import { Media } from '../../models/media.model';
import { MediaService } from '../../services/media.service';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ScanMediaComponent} from "../scan-media/scan-media.component";


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.scss',
})
export class AddMediaComponent{

  @Output() mediaAdded: EventEmitter<Media> = new EventEmitter();
  @ViewChild('mediaForm') mediaForm!: NgForm;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild(ScanMediaComponent) scanMediaComponent!: ScanMediaComponent;


  title: string = '';
  author: string = '';
  genre: string = '';
  mediatype: string = '';
  publicationdate: Date = new Date();
  rating: number = 0;
  image: string = '';
  description: string = '';
  submitError: string = '';
  imagePreview: string = '';
  uploadError: string = '';

  formGroup!: FormGroup;
  visible: boolean = false;

  isLoading: boolean = false;
  scannedBarcode: string = '';

  constructor(private mediaService: MediaService, private http: HttpClient) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
        genres: new FormControl<string | null>(null)
    });
  }

  previewImage(): void {
    console.log("Preview Image:", this.image);
    this.imagePreview = this.image;
  }

  showDialog() {
    this.visible = true;
  }

  saveGenres(): void {
    this.genre = this.formGroup.value.genres.join(', ');
  }

  addEverything(form: NgForm): void {
    if (form.valid) {

      let requestBody: Media = {
        title: this.title,
        author: this.author,
        genre: this.genre,
        mediatype: this.mediatype,
        publicationdate: this.publicationdate.getFullYear(),
        rating: this.rating,
        image: this.image,
        description: this.description
      };

      this.mediaService.addMedia(requestBody).subscribe(media => {
        this.mediaAdded.emit(media);
        this.mediaForm.resetForm();
        this.submitError = '';
        this.imagePreview = '';
      },
      error => {
        console.error('Error when adding media:', error);
        this.submitError = error.error.message || 'Error when adding media';
      })

    } else {
       console.log('Form is invalid, show errors');
    }
  }

  callScanMedia() {
    this.scanMediaComponent.startVideoButton();

    this.scanMediaComponent.barcodeScanned.subscribe({
      next: (barcode: string) => {
        this.scannedBarcode = barcode; // Barcode speichern
        console.log('Scanned Barcode:', this.scannedBarcode);
      }
    });

    this.scanMediaComponent.loadingStateActivate.subscribe({
      next: (state: boolean) => {
        this.isLoading = state; // Ladeanimation aktivieren
      }
    });

    this.scanMediaComponent.mediaDataAdded.subscribe({
      next: (data: {title: string, author: string, publicationdate: Date, barcode: string}) => {
        console.log('mediaDataAdded', data);
        this.title = data.title;
        this.author = data.author;
        this.publicationdate = data.publicationdate;
        this.scannedBarcode = data.barcode;
        console.log('scanner stopped barcode 1');
      }
    });

    this.scanMediaComponent.loadingStateDeactivate.subscribe({
      next: (state: boolean) => {
        if (!state) {
        setTimeout(() => {
            this.isLoading = state;
            this.scannedBarcode = ''; // Barcode zurücksetzen
            console.log('scanner stopped barcode 2');
          }, 3000);
        }
      }
    });
  }

}



