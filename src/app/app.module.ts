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
import { DocumentAnnotationComponent } from './document-annotation/document-annotation.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextHighlightComponent } from './text-highlight/text-highlight.component';

@NgModule({
  declarations: [
    AppComponent,
    LabelInputComponent,
    DocumentDisplayComponent,
    ImportComponent,
    DocumentAnnotationComponent,
    TextHighlightComponent,
  ],
  imports: [
    HttpClientModule, // Add HttpClientModule to your imports
    FormsModule, // Add FormsModule to your imports
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
