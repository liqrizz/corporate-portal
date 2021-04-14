const url = '/CorporateWebAPI';
export const rests = {
  hyperlink: {
    hyperlink_list: url + '/Hyperlink/GetHyperlinks',
    hyperlink_get: url + '/Hyperlink/GetHyperlink',
    hyperlink_set: url + '/Hyperlink/SetHyperlink',
    hyperlink_delete: url + '/Hyperlink/DelHyperlink'
  },
  folders: {
    folders_get: url + '/Folder/GetFolders',
    folders_post: url + '/Folder/SetFolder'
  },
  files: {
    files_get_all: url + '/File/GetFiles',
    files_get_one: url + '/File/GetFile',
    files_set: url + '/File/SetFile',
    files_delete: url + '/File/DelFile'
  },
  events: {
    events_get_all: url + '/Event/GetEvents',
    events_get_one: url + '/Event/GetEvent',
    events_set: url + '/Event/SetEvent',
    events_get_dates: url + '/Event/GetEventDates',
    events_delete: url + '/Event/DelEvent'
  },
  employee: {
    employee_get: url + '/Employee/GetEmployees',
    employee_reference: url + '/Reference/GetEmployees'
  },
  references: {
    references_get: url + '/FileExtension/GetFileExtensions',
    references_set: url + '/FileExtension/SetFileExtensions'
  },
  stat: url + '/Stat/GetMapEmployeesQty'
};
