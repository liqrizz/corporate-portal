import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {CreateLinkOverlayComponent} from '@app/pages/main/links/links/create-link-overlay/create-link-overlay.component';
import {HyperlinkService} from '@shared/services/hyperlink.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HyperlinkGet} from '@shared/models/hyperlink-get';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  providers: [DialogService]
})
export class LinksComponent implements OnInit, OnDestroy {
  linksItems: HyperlinkGet[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogService: DialogService,
              private hyperlinkService: HyperlinkService) {
  }

  ngOnInit(): void {
    this.loadLinks();
  }

  loadLinks(): void {
    this.hyperlinkService.getLinks()
      .subscribe(res => this.linksItems = res);
  }

  createLink(): void {
    const dialogRef = this.dialogService.open(CreateLinkOverlayComponent, {
      baseZIndex: 10000,
      closable: false,
      showHeader: false,
      contentStyle: {
        padding: '0px',
        borderRadius: '5px'
      }
    });

    dialogRef.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res && res.linkAdded) {
          this.loadLinks();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  delete(id): void {
    if (!confirm('Вы точно хотите удалить?')) {
      return;
    }
    this.hyperlinkService.deleteLink(id).subscribe(() => this.loadLinks());
  }
}
