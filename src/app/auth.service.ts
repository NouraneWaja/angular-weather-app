import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  isLoggedIn(): boolean {
    // Implementer la logique pour vérifier si l'utilisateur est connecté
    // Par exemple, vérifier la présence d'un token dans localStorage
    return !!localStorage.getItem('currentUser');
  }

  login(user: any): void {
    // Logique de connexion, comme stocker un token ou des informations utilisateur
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    // Logique de déconnexion, comme supprimer un token ou des informations utilisateur
    localStorage.removeItem('currentUser');
  }
}
