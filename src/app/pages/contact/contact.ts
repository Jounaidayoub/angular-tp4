import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  nom = '';
  email = '';
  message = '';

  constructor(private router: Router) {}

  envoyer(): void {
    if (this.nom && this.email && this.message) {
      console.log('Message envoyé :', { nom: this.nom, email: this.email });
      this.router.navigate(['/accueil']);
    }
  }

  rechercherProduit(terme: string): void {
    this.router.navigate(['/produits'], {
      queryParams: { q: terme, tri: 'prix' },
    });
  }
}
