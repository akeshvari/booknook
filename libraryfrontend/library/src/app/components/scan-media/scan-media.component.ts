import {Component, ElementRef, EventEmitter, Output, Input, ViewChild} from '@angular/core';
import {Media} from "../../models/media.model";
import {NgForm} from "@angular/forms";
import {BrowserMultiFormatReader, NotFoundException} from "@zxing/library";
import {Injectable, NgZone } from '@angular/core';
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-scan-media',
  templateUrl: './scan-media.component.html',
  styleUrl: './scan-media.component.scss'
})
 export class ScanMediaComponent {

  constructor(private ngZone: NgZone) {}

  @Output() mediaAdded: EventEmitter<Media> = new EventEmitter();
  @Output() mediaDataAdded: EventEmitter<{title: string, author: string, publicationdate: Date}> = new EventEmitter();
  @ViewChild('mediaForm') mediaForm!: NgForm;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>
  @Input() isLoading: boolean = false;
  @Output() loadingStateDeactivate: EventEmitter<boolean> = new EventEmitter();
  @Output() loadingStateActivate: EventEmitter<boolean> = new EventEmitter();
  @Output() barcodeScanned: EventEmitter<string> = new EventEmitter();


  title: string = '';
  author: string = '';
  publicationdate: Date = new Date();
  hasScanned: boolean = false;


  scanMedia() {
    const barcodeReader = new BrowserMultiFormatReader(); //Instanz für das Lesen des Barcodes
    const videoElement = document.getElementById('video') as HTMLVideoElement; //Video aufrufen aus dem DOM und wird als HTMLVideoElement typisiert

    navigator.mediaDevices.getUserMedia({video: true}) //Methode für den zugriff der Kamera
          .then((stream) => { //gibt einen promise zurück bei erfolg
              videoElement.srcObject = stream; //das erhaltene medienstream wird dem srcObject zugewiesen
              const playPromise = videoElement.play(); //video abspielen

              if (playPromise !== undefined) {
                  playPromise.then(() => {
                      barcodeReader.decodeFromVideoDevice(null, 'video', (result, err) => { //Der Promise 'null' (auswahl der kamera) wird nicht weiterverarbeitet, kann zu Fehlern führen
                          if (result) {
                            console.log('barcode: ', result.getText());
                            this.barcodeScanned.emit(result.getText());
                            this.loadingStateActivate.emit(true); // Ladeanimation aktivieren

                            fetch(`https://openlibrary.org/search.json?q=${result}`)
                              .then(response => {
                                if (!response.ok) {
                                  throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.json();
                              })
                              .then(data => {
                                if (data.docs && data.docs.length > 0) {
                                  console.log("Buch Titel:", data.docs[0].title);
                                  console.log("Autor:", data.docs[0].author_name);
                                  console.log("Publikationsdatum:", data.docs[0].first_publish_year);
                                  console.log("Medientyp:", data.docs[0].type);
                                  console.log("Genre:", data.docs[0].subject);

                                  if (!this.hasScanned) {
                                    this.hasScanned = true; // Verhindert weitere Ausführungen
                                    this.title = data.docs[0].title;

                                    this.author = Array.isArray(data.docs[0].author_name)
                                      ? data.docs[0].author_name.join(', ') // Array in String umwandeln, getrennt durch Kommas
                                      : data.docs[0].author_name; // Einzelnen Autor direkt zuweisen

                                    const year = data.docs[0].first_publish_year;
                                    if (year) {
                                      this.updatePublicationDate(year); // Konvertiert die Jahreszahl in ein Date-Objekt
                                      this.mediaDataAdded.emit({
                                        title: this.title,
                                        author: this.author,
                                        publicationdate: this.publicationdate
                                      });
                                    }
                                  }
                                } else {
                                  this.ngZone.run(() => { // ngZone.run() stellt sicher, dass die UI-Aktualisierung im Angular-Kontext erfolgt
                                    alert('Es wurden keine Buchdaten für diesen Barcode gefunden.');
                                  });
                                  console.log("Keine Buchdaten gefunden für den gescannten Barcode.");
                                }
                              })
                              .catch(error => {
                                console.error("Fehler beim Abrufen der Buchdaten: ", error);
                              })
                              .finally(() => {
                                this.loadingStateDeactivate.emit(false); // Ladeanimation deaktivieren
                                this.stopMedia(videoElement); // Video-Stream erst nach einer Verzögerung stoppen
                                });
                              }
                            if (err && !(err instanceof NotFoundException)) {
                              console.error(err);
                            }
                          });
                      }).catch((error) => {
                      console.error("Fehler beim Abspielen des Videos: ", error);
                    });
                  }
          }).catch((err) => {
          console.error("Fehler beim Zugriff auf die Kamera: ", err);
    });

  }

  stopMedia(videoElement: HTMLVideoElement) {
    const stream = videoElement.srcObject as MediaStream;

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoElement.style.display = 'none';
    }

  }

  startVideoButton() {
    const videoElement = document.querySelector('video');

    if (videoElement) {
      videoElement.style.display = 'block';
    }
    this.scanMedia();
  }

  onCancel() {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (videoElement) {
      console.log('Video element found');

      const stream = videoElement.srcObject as MediaStream;

      if (stream) { //kamera stoppen

        console.log('Stream found');

        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        console.log(`Stopped track`);

      }

      videoElement.srcObject = null; // Stop the video stream
      videoElement.style.display = 'none';
      console.log('Barcode scanner stopped');

    } else {
      console.error('Video player is not initialized!');
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log('All media devices stopped'); //dauert einige sekunden, aber die kamera geht dann aus
      })
      .catch(error => console.error('Error stopping media devices:', error));
  }
  updatePublicationDate(year: number) {
    this.ngZone.run(() => {
      this.publicationdate = new Date(year, 0, 1); // Setzt den 1. Januar des Jahres
    });

  }
}
