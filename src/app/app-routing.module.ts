import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDisplayComponent } from './document-display/document-display.component';
import { LabelInputComponent } from './label-input/label-input.component';
import { ImportComponent } from './import/import.component';
import { DocumentAnnotationComponent } from './document-annotation/document-annotation.component';
import { TextHighlightComponent } from './text-highlight/text-highlight.component';

const routes: Routes = [
  { path: 'document-display', component: DocumentDisplayComponent },
  { path: 'label-input', component: LabelInputComponent },
  { path: 'import', component: ImportComponent },
  { path: 'document-annotation', component: DocumentAnnotationComponent },
  { path: 'text-highlight', component: TextHighlightComponent },

  { path: '', redirectTo: '/document-display', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
