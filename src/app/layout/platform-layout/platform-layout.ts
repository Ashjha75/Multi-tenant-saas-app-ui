import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-platform-layout',
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './platform-layout.html',
  styleUrl: './platform-layout.css',
})
export class PlatformLayout {}
