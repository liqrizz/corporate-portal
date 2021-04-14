import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FileService} from '@shared/services/file.service';
import {FolderFileSet} from '@shared/models/folder-file-set';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {
  fileName: any;
  file: File;

  private readonly folderId: number;

  constructor(public ref: DynamicDialogRef,
              private fileService: FileService,
              private authService: AuthService,
              private config: DynamicDialogConfig) {
    this.folderId = this.config.data.folderId;
  }

  ngOnInit(): void {
  }

  create(): void {
    const file: FolderFileSet = {
      content: this.file,
      createdBy: this.authService.getUser().id,
      extension: '.xlsx',
      folderId: this.folderId,
      name: this.fileName,
    };
    this.fileService.setFile(file).subscribe(() => {
      this.ref.close({fileCreated: true});
    });
  }

  handleFileInput(files: FileList): void {
    this.file = files.item(0);
    this.fileName = this.file.name;
  }
}
