import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaUrl = 'api/media';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

   getMedias(): Observable<Media[]> {
      return this.http.get<Media[]>(this.mediaUrl)
        .pipe(
          catchError(this.handleError<Media[]>('getMedias', []))
        );
   }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        };
    }

    addMedia(media: Media): Observable<Media> {
    console.log("addMedia to database, data: ", media);
      return this.http.post<Media>(this.mediaUrl, media, this.httpOptions).pipe(
        catchError(error => {
          const errorMessageDiv = document.getElementById('error-message');
          if (errorMessageDiv) {
            errorMessageDiv.style.display = 'block';
          }
          return throwError(error);
        })
      );
    }

    editMedia(media: Media): Observable<Media> {
      return this.http.put<Media>(this.mediaUrl, media, this.httpOptions).pipe(
        catchError(this.handleError<Media>('putMedia'))
      );
    }

    deleteMedia(mediaTitle : string) {
       return this.http.delete(this.mediaUrl + `/${mediaTitle}`);
    }
}
