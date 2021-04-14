export interface FolderFileSet {
  id?: number;
  folderId: number;
  name: string;
  extension?: string;
  fileType?: string;
  createdBy: number;
  content: any;
}
