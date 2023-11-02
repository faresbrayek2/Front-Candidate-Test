import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabelInputComponent } from './label-input/label-input.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DocumentDisplayComponent } from './document-display/document-display.component';
import { ImportComponent } from './import/import.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LabelInputComponent,
    DocumentDisplayComponent,
    ImportComponent,
  ],
  imports: [
    HttpClientModule, // Add HttpClientModule to your imports
    FormsModule, // Add FormsModule to your imports
    BrowserModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
