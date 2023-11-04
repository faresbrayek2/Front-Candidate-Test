import { Component, OnInit } from '@angular/core';
import { LabelService } from '../label.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-text-highlight',
  templateUrl: './text-highlight.component.html',
  styleUrls: ['./text-highlight.component.css'],
})
export class TextHighlightComponent implements OnInit {
  selectedColor: string = 'yellow';
  private selectedRange: Range | null = null;
  labels: { name: string; color: string }[] = [];
  annotations: any[] = [];

  constructor(private labelService: LabelService, private http: HttpClient) {}

  ngOnInit() {
    this.labelService.getLabels().subscribe(
      (labels) => {
        this.labels = labels.map((label: any) => ({
          name: label.name as string,
          color: this.getRandomColor(),
        }));
      },
      (error) => {
        console.error('Error fetching labels', error);
      }
    );
  }

  onMouseUp(event: MouseEvent) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.selectedRange = selection.getRangeAt(0);
    }
  }

  onColorChange(color: string) {
    if (this.selectedRange) {
      const span = document.createElement('span');
      span.style.backgroundColor = color;
      this.selectedRange.surroundContents(span);

      const annotation = this.getHighlightedText(
        document.getElementById('highlight-text'),
        color
      );
      this.annotations.push(annotation);

      this.selectedRange = null;
    }
  }

  exportAnnotations() {
    const content = document.getElementById('highlight-text');
    if (content) {
      const exportData = {
        document: content.textContent,
        annotations: this.annotations.map((annotation) => ({
          text: annotation.text,
          start: annotation.start,
          end: annotation.end,
          label: annotation.label,
        })),
      };

      console.log(JSON.stringify(exportData, null, 2));

      // You can send or save the exportData as needed, for example, by making an HTTP POST request.
    } else {
      console.error("Element with ID 'highlight-text' not found.");
    }

    // You can send or save the exportData as needed, for example, by making an HTTP POST request.
  }

  private countCharactersWithinText(
    // count how many characters are before the selection
    content: HTMLElement,
    startContainer: Node,
    startOffset: number
  ): number {
    let count = 0;
    const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (node === startContainer) {
        return count + startOffset;
      }
      count += node.textContent?.length || 0;
    }
    return count;
  }
  private countCharactersInSelection(range: Range | null): number {
    if (range) {
      return range.toString().length;
    }
    return 0;
  }

  private getHighlightedText(
    content: HTMLElement | null,
    highlightColor: string
  ) {
    const annotation = {
      text: '',
      start: 0,
      end: 0,
      label: this.labels.find((label) => label.color === highlightColor)?.name,
    };

    if (content && this.selectedRange) {
      annotation.text = this.selectedRange.toString();
      annotation.start = content.textContent?.indexOf(annotation.text) || 0;
      annotation.end = annotation.start + annotation.text.length;
    }

    return annotation;
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
