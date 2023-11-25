import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor( /*private httpclient : HttpClient */) { }
  /*
  //methodes pour les ops de crédits
  emprunterCredit(montant: number, interet: number): Emprunt {
    let totalMontant = montant + ( montant * interet );
    let emprunt = new Emprunt(totalMontant); //cree un nouvel objet emprunt avec le montant total à l'emprunt
    return emprunt;
  }

  preterCredit(montant: number, interet: number): Pret {
    let totalMontant = montant + ( montant * interet );
    let pret = new Pret(totalMontant);
    return pret;
  }
  
  epargnerCredit(montant: number, interet: number): Epargne {
    let totalMontant = montant + ( montant * interet );
    let epargne = new Epargne(totalMontant);
    return epargne;
  }*/
}
