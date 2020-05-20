import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() type: string = 'default';
  private imageLink: string = 'assets/loader.gif';

  get link() {
    return this.imageLink;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
