import { Injectable } from '@angular/core';

export interface Produit {
  id: number;
  nom: string;
  prix: number;
  enStock: boolean;
  description: string;
  categorie: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private produits: Produit[] = [
    { id: 1, nom: 'Laptop Pro 15', prix: 8500, enStock: true, description: 'Processeur i7, 16 Go RAM, SSD 512 Go', categorie: 'Informatique' },
    { id: 2, nom: 'Souris Wireless', prix: 150, enStock: true, description: 'Ergonomique, sans fil, autonomie 12 mois', categorie: 'Périphérique' },
    { id: 3, nom: 'Clavier Méca', prix: 300, enStock: false, description: 'Switches Cherry MX Red, rétroéclairé', categorie: 'Périphérique' },
    { id: 4, nom: 'Écran 4K 27"', prix: 3200, enStock: true, description: 'IPS, 144Hz, HDR, USB-C', categorie: 'Moniteur' },
    { id: 5, nom: 'Casque Audio', prix: 450, enStock: true, description: 'Noise cancelling, 30h autonomie', categorie: 'Audio' },
  ];

  getAll(): Produit[] {
    return this.produits;
  }

  getById(id: number): Produit | undefined {
    return this.produits.find(p => p.id === id);
  }

  getByCategorie(cat: string): Produit[] {
    return this.produits.filter(p => p.categorie === cat);
  }
}
