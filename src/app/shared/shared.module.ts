import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateExampleComponent} from './components/smart/create-example/create-example.component';
import {DummyExampleComponent} from './components/dummy/dummy-example/dummy-example.component';
import {FormValidateDirective} from './directives/form-validate.directive';
import {SimplePipe} from './pipes/simple.pipe';
import {CalendarComponent} from './components/dummy/calendar/calendar.component';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {FolderBlockComponent} from './components/dummy/folder-block/folder-block.component';
import {TitleChangeComponent} from './components/dummy/title-change/title-change.component';
import {HasValueDirective} from './directives/has-value.directive';
import {CreateFolderComponent} from './components/dummy/create-folder/create-folder.component';
import {CreateFileComponent} from './components/dummy/create-file/create-file.component';
import {DefineFileTypePipe} from './pipes/define-file-type.pipe';
import {InitialNamePipe} from './pipes/initial-name.pipe';
import {FullNamePipe} from './pipes/full-name.pipe';


@NgModule({
  declarations: [CreateExampleComponent,
    DummyExampleComponent,
    FormValidateDirective,
    SimplePipe,
    CalendarComponent,
    FolderBlockComponent,
    TitleChangeComponent,
    HasValueDirective, HasValueDirective, CreateFolderComponent, CreateFileComponent, DefineFileTypePipe, InitialNamePipe, FullNamePipe],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
  ],
  exports: [
    FullNamePipe,
    CalendarComponent,
    FolderBlockComponent,
    TitleChangeComponent,
    HasValueDirective,
    DefineFileTypePipe,
    InitialNamePipe
  ]
})
export class SharedModule {
}
