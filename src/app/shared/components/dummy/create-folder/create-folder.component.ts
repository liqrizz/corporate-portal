import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FolderService} from '@shared/services/folder.service';
import {AuthService} from '@shared/services/auth.service';
import {Toast} from 'primeng/toast';
import {FolderGetDto} from '@shared/models/folder-get-dto';
import {FolderTypeEnum} from '@shared/models/folder-type-enum.enum';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent implements OnInit {
  folderName = '';
  parentId: FolderTypeEnum;

  constructor(public ref: DynamicDialogRef,
              private folderService: FolderService,
              private authService: AuthService,
              private toastr: Toast,
              private config: DynamicDialogConfig) {
    this.parentId = config.data.parentId;
  }

  ngOnInit(): void {
  }

  create(): void {
    const toSave: FolderGetDto = {
      name: this.folderName,
      createdOn: new Date(),
      parentId: this.parentId,
      createdBy: this.authService.getUser().id
    };
    this.folderService.postFolder(toSave)
      .subscribe(() => {
        this.toastr.add([{data: 'Успешно файл создан', severity: 'success'}]);
        this.ref.close({created: true});
      });
  }

}
