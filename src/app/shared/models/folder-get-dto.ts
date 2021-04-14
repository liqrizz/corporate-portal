export interface FolderGetDto {
  id?: number;
  parentId?: number;
  name: string;
  createdBy: number;
  createdOn: Date;
}
