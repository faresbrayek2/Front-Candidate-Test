import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.css'],
})
export class LabelInputComponent {
  newLabel: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.newLabel.trim() === '') {
      console.log('Label cannot be empty.');
      return;
    }

    // Send the new label to the backend
    this.http
      .post<any>('http://127.0.0.1:8000/api/labels/', { name: this.newLabel })
      .subscribe(
        (response) => {
          console.log('Label created successfully', response);
          // You can also update your UI to reflect the new label if needed
        },
        (error) => {
          console.error('Error creating label', error);
          // Handle error, show an error message, etc.
        }
      );
    this.newLabel = ''; // Clear the input field for the next label
  }
}
