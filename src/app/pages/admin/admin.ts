import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  constructor(public authService: AuthService) {}
}
