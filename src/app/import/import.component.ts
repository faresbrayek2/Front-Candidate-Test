import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {
  constructor(private http: HttpClient) {}
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = reader.result as string;
        // Send the file content to the backend using HttpClient
        this.http
          .post('http://localhost:8000/api/documents/', {
            content: fileContent,
          })
          .subscribe(
            (response) => {
              console.log('Document annotated successfully:', response);
            },
            (error) => {
              console.error('Error annotating document', error);
            }
          );
      };

      reader.readAsText(selectedFile);
    }
  }
}
