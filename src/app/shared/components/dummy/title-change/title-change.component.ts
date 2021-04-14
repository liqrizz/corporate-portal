import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FolderGetDto} from '@shared/models/folder-get-dto';

@Component({
  selector: 'app-title-change',
  templateUrl: './title-change.component.html',
  styleUrls: ['./title-change.component.scss']
})
export class TitleChangeComponent implements OnInit {
  @Input() folderName: string;
  @Output() titleChange = new EventEmitter<string>();
  editFolderName = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onEditClicked(titleElement: HTMLHeadingElement): void {
    this.editFolderName = !this.editFolderName;
    if (!this.editFolderName) {
      this.titleChange.emit(this.folderName);
    }
    setTimeout(() => titleElement.focus({}), 100);
  }

  onInput($event): void {
    this.folderName = $event.target.value;
  }
}
