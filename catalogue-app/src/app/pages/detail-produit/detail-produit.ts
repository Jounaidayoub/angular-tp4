import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProduitService, Produit } from '../../services/produit';

@Component({
  selector: 'app-detail-produit',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './detail-produit.html',
  styleUrl: './detail-produit.css',
})
export class DetailProduit implements OnInit {
  id: string = '';
  produit: Produit | undefined;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.produit = this.produitService.getById(+this.id);
    console.log('Produit demandé :', this.id, '→', this.produit?.nom);
  }
}
