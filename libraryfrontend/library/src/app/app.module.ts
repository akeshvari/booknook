import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMediaComponent } from './components/add-media/add-media.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MediasComponent } from './components/medias/medias.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EditMediaComponent } from './components/edit-media/edit-media.component';
import { DeleteMediaComponent } from './components/delete-media/delete-media.component';
import { EditMediaDialogComponent } from './components/edit-media-dialog/edit-media-dialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ScanMediaComponent } from "./components/scan-media/scan-media.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import {ZXingSystem} from "@zxing/library";


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    CalendarModule,
    RatingModule,
    TagModule,
    CheckboxModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    AvatarModule,
    AppRoutingModule,
    ZXingScannerModule
  ],
  declarations: [
      AppComponent,
      AddMediaComponent,
      MediasComponent,
      DeleteMediaComponent,
      EditMediaComponent,
      EditMediaDialogComponent,
      ScanMediaComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
