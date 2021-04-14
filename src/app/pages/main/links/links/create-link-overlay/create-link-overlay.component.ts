import {Component} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HyperlinkService} from '@shared/services/hyperlink.service';

@Component({
  selector: 'app-create-link-overlay',
  templateUrl: './create-link-overlay.component.html',
  styleUrls: ['./create-link-overlay.component.scss'],
})
export class CreateLinkOverlayComponent {
  form: FormGroup;
  imgSrc;
  imgFile;
  linkValidator = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private hyperlinkService: HyperlinkService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern(this.linkValidator)]]
    });
  }

  handleFileInput(files: FileList): void {
    this.imgFile = files.item(0);
  }

  onSubmit(): void {
    const toSave = this.form.getRawValue();
    this.hyperlinkService.setLink(toSave).subscribe(() => {
      this.ref.close({linkAdded: true});
    });
  }
}
