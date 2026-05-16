import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, NgxLoadingBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
