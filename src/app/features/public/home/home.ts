import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpiCard } from '../../../shared/components/kpi-card/kpi-card';

@Component({
  selector: 'app-home',
  imports: [KpiCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
