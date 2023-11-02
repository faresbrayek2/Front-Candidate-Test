/**
 * @fileoverview This file contains the DocumentDisplayComponent class which is responsible for displaying the document content and its annotations.
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * DocumentDisplayComponent class
 * @class
 */
@Component({
  selector: 'app-document-display',
  templateUrl: './document-display.component.html',
  styleUrls: ['./document-display.component.css'],
})
export class DocumentDisplayComponent implements OnInit {
  /**
   * The content of the document
   * @type {any}
   */
  documentContent: any = '';

  /**
   * The annotation of the document
   * @type {string}
   */
  annotation: string = '';

  /**
   * The labels of the document
   * @type {string[]}
   */
  labels: string[] = [];

  /**
   * The safe HTML of the document
   * @type {SafeHtml}
   */
  documentC: SafeHtml = '';

  /**
   * The label colors of the document
   * @type {Map<string, string>}
   */
  labelColors: Map<string, string> = new Map();

  /**
   * Creates an instance of DocumentDisplayComponent.
   * @param {HttpClient} http - The HttpClient service to make HTTP requests.
   * @param {DomSanitizer} sanitizer - The DomSanitizer service to sanitize HTML.
   */
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  /**
   * Initializes the component by fetching the document and labels.
   */
  ngOnInit(): void {
    this.fetchDocument();
    this.fetchlabels();
  }

  /**
   * Fetches the document from the API.
   */
  fetchDocument() {
    this.http.get<any>('http://127.0.0.1:8000/api/documents/').subscribe(
      (response) => {
        const json = JSON.parse(response[0].content);
        this.documentContent = json.document;
        this.annotation = json.annotation;
      },
      (error) => {
        console.error('Error fetching documents', error);
      }
    );
  }

  /**
   * Fetches the labels from the API.
   */
  fetchlabels() {
    this.http.get<any>('http://127.0.0.1:8000/api/labels/').subscribe(
      (response) => {
        response.forEach((label: any) => {
          this.labels.push(label.name as string);
          this.labelColors.set(label.name, this.getRandomColor());
        });
        this.getAnnotationLabels();
      },
      (error) => {
        console.error('Error fetching labels', error);
      }
    );
  }

  /**
   * Generates a random color.
   * @returns {string} - The random color.
   */
  getRandomColor(): string {
    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple',
      'pink',
      'brown',
      'grey',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Gets the labels and text of the annotations and highlights them in the document content.
   */
  getAnnotationLabels() {
    for (const i of this.annotation) {
      const text = (i as any).text;
      const label = (i as any).label;
      const dictionary = {
        text: text,
        label: label,
      };
      const matchingObject = this.labels.find((o) => o === label);

      if (matchingObject) {
        length = dictionary.text.length;
        const matchingWordIndex = this.documentContent.indexOf(dictionary.text);
        const endOfMatchingWordIndex = matchingWordIndex + length;

        this.documentContent =
          this.documentContent.slice(0, matchingWordIndex) +
          '<span style="background-color:' +
          this.labelColors.get(label) +
          '">' +
          this.documentContent.slice(
            matchingWordIndex,
            endOfMatchingWordIndex
          ) +
          '</span>' +
          this.documentContent.slice(endOfMatchingWordIndex);
      }
    }
    this.documentC = this.sanitizer.bypassSecurityTrustHtml(
      this.documentContent
    );
  }
}
