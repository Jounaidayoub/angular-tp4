import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProduitService, Produit } from '../../services/produit';

@Component({
  selector: 'app-produits',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './produits.html',
  styleUrl: './produits.css',
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produits = this.produitService.getAll();
  }
}
