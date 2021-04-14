import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {rests} from '@shared/services/rests';
import {Observable} from 'rxjs';
import {FolderFileSet} from '@shared/models/folder-file-set';
import {FolderFileGet} from '@shared/models/folder-file-get';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  getFiles(folderId: number, search?, sort?): Observable<FolderFileGet[]> {
    const params: any = {folderId: String(folderId)};
    if (search) {
      params.criteria = search;
    }
    if (sort) {
      params.sortBy = sort.field;
      params.sortDirection = sort.order;
    }
    return this.http.get<FolderFileGet[]>(rests.files.files_get_all, {params});
  }

  getFile(id): Observable<any> {
    return this.http.get(rests.files.files_get_one, {params: {id}, responseType: 'blob'});
  }

  setFile(file: FolderFileSet): Observable<any> {
    const formData = new FormData();
    formData.set('folderId', String(file.folderId));
    formData.set('name', file.name);
    formData.set('extension', file.extension);
    formData.set('createdBy', String(file.createdBy));
    formData.set('content', file.content);
    return this.http.post(rests.files.files_set, formData);
  }

  deleteFile(fileId: any): Observable<any> {
    return this.http.post(rests.files.files_delete, {}, {params: {id: fileId}});
  }
}
