import { Component, OnInit } from '@angular/core';
import { Media } from '../../models/media.model';
import { MediaService } from '../../services/media.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.scss'
})
export class MediasComponent implements OnInit {
  medias: Media[] = [];
  filteredMedias: Media[] = [];

  constructor(private mediaService: MediaService) { }

   ngOnInit(): void {
      this.getMedias();
   }

   getMedias(): void {
       this.mediaService.getMedias().subscribe(medias => {
         this.medias = medias;
         this.filteredMedias = medias;
       });
     }

   addMediaToList(media : Media) {
    if (!this.medias) { this.medias = []}
    this.medias.push(media);
   }

   onMediaDeleted(mediaTitle : string) {
     this.medias.forEach( (media, index) => {
       if(media.title === mediaTitle) {
          this.medias.splice(index,1);
          }
     });
   }

  onMediaEdited(media: Media) {
    console.log('Editing media:', media);

    this.mediaService.editMedia(media).subscribe(mediaReturnValue => {
       console.log('Edited media returned from service:', mediaReturnValue);

       const index = this.medias.findIndex(m => m.title === mediaReturnValue.title);
           if (index !== -1) {
             this.medias[index] = mediaReturnValue;
             this.filteredMedias[index] = mediaReturnValue;
           } else {
             console.error(`Media with title ${mediaReturnValue.title} not found in the list.`);
             this.medias.push(mediaReturnValue);
             this.filteredMedias.push(mediaReturnValue);
           }
       }, error => {
             console.error('Error editing media:', error);
          });

    }

     searchFunction(): void {
       let input = document.getElementById("searchInput") as HTMLInputElement;
       let filter = input.value.toUpperCase();

       this.filteredMedias = this.medias.filter(media => {
         return Object.values(media).some(val =>
           String(val).toUpperCase().includes(filter)
         );
       });
     }

     sortingFunctionTitle(): void {
       this.medias.sort((a, b) => a.title.localeCompare(b.title));
     }

     sortingFunctionAuthor(): void {
       this.medias.sort((a, b) => a.author.localeCompare(b.author));
     }

     sortByPublicationDateAsc: boolean = true;
     sortByRatingAsc: boolean = true; // Asc - Ascending - Aufsteigend

     toggleSortByPublicationDate(): void {
        this.sortByPublicationDateAsc = !this.sortByPublicationDateAsc;
        this.sortByPublicationDate();
     }

     toggleSortByRating(): void {
        this.sortByRatingAsc = !this.sortByRatingAsc;
        this.sortByRating();
     }

    sortByPublicationDate(): void {
        this.medias.sort((a, b) =>
          this.sortByPublicationDateAsc ? a.publicationdate - b.publicationdate : b.publicationdate - a.publicationdate
        );
    }

    sortByRating(): void {
        this.medias.sort((a, b) =>
          this.sortByRatingAsc ? a.rating - b.rating : b.rating - a.rating
        );
    }
}
