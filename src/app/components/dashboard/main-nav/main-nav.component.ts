import { Component, Output,EventEmitter,NgZone } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { ServiceMainService } from 'src/app/core/service/service-main.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})


export class MainNavComponent {
  color: ThemePalette = 'primary';
  checked = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
    public router: Router,
    private ngZone: NgZone, private _service: ServiceMainService) {}

    ngOnInit(): void {
    }

  public home():void{
    // this._service.headerEvetEmmiter.next(true);
    // window.location.reload();
    // this.router.navigate(['/Home']);
  }

}
