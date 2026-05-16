import { Component } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { PageHeader } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-about',
  imports: [PageHeader, Card],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
