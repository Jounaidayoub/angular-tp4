import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  seDeconnecter(): void {
    this.authService.deconnecter();
    this.router.navigate(['/accueil']);
  }
}
