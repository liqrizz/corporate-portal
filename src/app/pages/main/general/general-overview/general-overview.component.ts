import {Component, OnInit} from '@angular/core';
import {FolderService} from '@shared/services/folder.service';
import {FolderGetDto} from '@shared/models/folder-get-dto';
import {DialogService} from 'primeng/dynamicdialog';
import {Toast} from 'primeng/toast';
import {debounceTime, switchMap} from 'rxjs/operators';
import {FileService} from '@shared/services/file.service';
import {FolderFileGet} from '@shared/models/folder-file-get';
import {FormControl} from '@angular/forms';
import {FolderTypeEnum} from '@shared/models/folder-type-enum.enum';
import {MessageService} from 'primeng/api';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './general-overview.component.html',
  styleUrls: ['./general-overview.component.scss']
})
export class GeneralOverviewComponent implements OnInit {
  folders: FolderGetDto[];
  selectedFolder: FolderGetDto;
  data: FolderFileGet[];
  cols: any = [
    {field: 'extension', header: '', width: '4rem', noSort: true},
    {field: 'name', header: 'Название'},
    {field: 'from', header: 'От кого'},
    {field: 'date', header: 'Дата'},
    {field: 'extension', header: 'Тип'}
  ];
  searchControl: FormControl = new FormControl();
  folderType = FolderTypeEnum.GENERAL;
  userName: string;
  searchVal: any;


  constructor(private folderService: FolderService,
              private dialogService: DialogService,
              private fileService: FileService,
              private messageService: MessageService,
              private authService: AuthService) {

    const userInfo = this.authService.getUser();
    this.userName = `${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`;
    this.loadFolders();
    this.data = [];
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(res => {
        this.searchVal = res;
        this.loadFilesOfFolder(res);
      });
  }

  onFileCreated(): void {
    this.messageService.add({severity: 'success', summary: 'Успешно добавлен'});
    this.loadFilesOfFolder();
  }

  folderChanged(fileName): void {
    if (!fileName) {
      return;
    }
    this.selectedFolder.name = fileName;
    this.folderService.postFolder(this.selectedFolder)
      .subscribe(() => this.messageService.add({severity: 'success', summary: 'Успешно изменен'}));
  }

  onFolderCreated(): void {
    this.messageService.add({severity: 'success', summary: 'Успешно добавлен'});
    this.loadFolders();
  }

  private loadFolders(): void {
    this.folderService.getFolders()
      .pipe(
        debounceTime(500),
        switchMap(res => {
          this.folders = res;
          this.selectedFolder = this.folders[0];
          return this.fileService.getFiles(this.selectedFolder.id);
        }))
      .subscribe(res => {
        this.data = res;
      });
  }

  onFolderSelected($event: FolderGetDto): void {
    this.selectedFolder = $event;
    this.loadFilesOfFolder();
  }

  loadFilesOfFolder(searchVal?, sort?): void {
    this.fileService.getFiles(this.selectedFolder.id, searchVal, sort)
      .pipe(debounceTime(500))
      .subscribe(res => this.data = res);
  }

  deleteFile(fileId): void {
    this.fileService.deleteFile(fileId).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Успешно удален'});
      this.loadFilesOfFolder();
    });
  }

  onLazyLoad(event: any): void {
    if (event.sortField && event.sortOrder) {
      const orders = {name: 1, date: 2, from: 3, extension: 4};
      const sort = {field: orders[event.sortField], order: event.sortOrder === 1};
      this.loadFilesOfFolder(this.searchVal, sort);
    }
  }

  downloadFile(row): void {
    this.fileService.getFile(row.id)
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = row.name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }
}
