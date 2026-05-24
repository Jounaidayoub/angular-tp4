import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _connecte = false;
  private _utilisateur = '';

  estConnecte(): boolean {
    return this._connecte;
  }

  getUtilisateur(): string {
    return this._utilisateur;
  }

  connecter(email: string): void {
    this._connecte = true;
    this._utilisateur = email;
    console.log('✅ Connecté :', email);
  }

  deconnecter(): void {
    this._connecte = false;
    this._utilisateur = '';
    console.log('🏠 Déconnecté');
  }
}
