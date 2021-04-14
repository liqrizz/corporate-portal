import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {rests} from '@shared/services/rests';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {FolderGetDto} from '@shared/models/folder-get-dto';
import {FolderSetDto} from '@shared/models/folder-set-dto';
import {FolderTypeEnum} from '@shared/models/folder-type-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) {
  }

  getFolders(parentId: number = FolderTypeEnum.GENERAL): Observable<FolderGetDto[]> {
    return this.http.get<FolderGetDto[]>(rests.folders.folders_get, {params: {parentId: String(parentId)}});
  }

  postFolder(folder: FolderGetDto): Observable<any> {
    return this.http.post(rests.folders.folders_post, folder);
  }


}
