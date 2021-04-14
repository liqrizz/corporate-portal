import {Component, OnInit} from '@angular/core';
import {FolderGetDto} from '@shared/models/folder-get-dto';
import {FolderService} from '@shared/services/folder.service';
import {FolderTypeEnum} from '@shared/models/folder-type-enum.enum';
import {FileService} from '@shared/services/file.service';
import {FolderFileGet} from '@shared/models/folder-file-get';
import {MessageService} from 'primeng/api';
import {environment} from '@environments/environment';
import {AuthService} from '@shared/services/auth.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './gallery-overview.component.html',
  styleUrls: ['./gallery-overview.component.scss']
})
export class GalleryOverviewComponent implements OnInit {
  selectedFolder: FolderGetDto;
  folders: FolderGetDto[];
  folderName = 'Фото тренинга по НПСК';
  folderType: FolderTypeEnum = FolderTypeEnum.MEDIA;
  folderFiles: FolderFileGet[];
  api = environment.url;
  userName: string;

  constructor(private folderService: FolderService,
              private fileService: FileService,
              private messageService: MessageService,
              private authService: AuthService) {
    const userInfo = this.authService.getUser();
    this.userName = `${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`;
    this.loadFolders();
  }

  ngOnInit(): void {
  }

  loadFolders(): void {
    this.folderService.getFolders(FolderTypeEnum.MEDIA)
      .pipe(debounceTime(500))
      .subscribe(res => {
        this.folders = res;
        this.selectedFolder = res[0];
        this.loadFolderFiles();
      });
  }

  onFileCreated(): void {
    this.messageService.add({severity: 'success', summary: 'Успешно добавлен'});
    this.loadFolderFiles();
  }

  onFolderCreated(): void {
    this.messageService.add({severity: 'success', summary: 'Успешно добавлен'});
    this.loadFolders();
  }

  onFolderSelected($event: FolderGetDto): void {
    this.selectedFolder = $event;
    this.loadFolderFiles();
  }

  private loadFolderFiles(): void {
    this.fileService.getFiles(this.selectedFolder.id)
      .pipe(debounceTime(500))
      .subscribe(res => {
        this.folderFiles = res;
      });
  }

  onTitleChanged(fileName: string): void {
    if (!fileName) {
      return;
    }
    this.selectedFolder.name = fileName;
    this.folderService.postFolder(this.selectedFolder)
      .subscribe(() => this.messageService.add({severity: 'success', summary: 'Успешно изменен'}));
  }

  deleteFile(id: number): void {
    this.fileService.deleteFile(id).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Успешно удален'});
      this.loadFolderFiles();
    });
  }
}
