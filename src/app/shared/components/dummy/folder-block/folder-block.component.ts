import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FolderGetDto} from '@shared/models/folder-get-dto';
import {DialogService} from 'primeng/dynamicdialog';
import {CreateFolderComponent} from '@shared/components/dummy/create-folder/create-folder.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FileService} from '@shared/services/file.service';
import {AuthService} from '@shared/services/auth.service';
import {CreateFileComponent} from '@shared/components/dummy/create-file/create-file.component';
import {FolderTypeEnum} from '@shared/models/folder-type-enum.enum';

@Component({
  selector: 'app-folder-block',
  templateUrl: './folder-block.component.html',
  styleUrls: ['./folder-block.component.scss']
})
export class FolderBlockComponent {
  @Input() folders: FolderGetDto[];
  @Input() selected: FolderGetDto;
  @Input() folderType: FolderTypeEnum;

  @Output() folderSelected: EventEmitter<FolderGetDto> = new EventEmitter<FolderGetDto>();
  @Output() folderCreated: EventEmitter<void> = new EventEmitter<void>();
  @Output() fileCreated: EventEmitter<void> = new EventEmitter<void>();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dialogService: DialogService,
              private fileService: FileService,
              private authService: AuthService) {
  }

  onCreateFolder(): void {
    this.dialogService.open(CreateFolderComponent, {
      data: {
        title: '',
        parentId: this.folderType
      },
      showHeader: false,
      width: '50rem',
      header: '29rem'
    }).onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res && res.created) {
          this.folderCreated.emit();
        }
      });
  }

  selectFolder(item: FolderGetDto): void {
    this.selected = item;
    this.folderSelected.emit(item);
  }

  onCreateFile(): void {
    this.dialogService.open(CreateFileComponent, {
      showHeader: false,
      data: {folderId: this.selected.id}
    }).onClose.subscribe(res => {
      if (res && res.fileCreated) {
        this.fileCreated.emit();
      }
    });
  }
}
