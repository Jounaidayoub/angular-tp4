import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  erreur = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  connecter(): void {
    if (!this.email || !this.password) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }
    this.authService.connecter(this.email);
    this.router.navigate(['/admin']);
  }

  annuler(): void {
    this.router.navigate(['/accueil']);
  }
}
