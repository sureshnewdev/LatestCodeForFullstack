import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../models/cardmodel';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  

  baseUrl = 'https://localhost:44370/api/cards';
  getCardsByNameUrl ="https://localhost:44370/api/cards/GetCardByName";
  

  constructor(private http: HttpClient) { }

  //Get all cards
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl);
     
  }

  //Get all cards
  getAllCardsByName(cardName: string, price :string): Observable<Card[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cardName",cardName).append("price",price);
    console.log("________________________"+ cardName);
    console.log("________________________"+ cardName);
     
    return this.http.get<Card[]>(this.getCardsByNameUrl, { params:queryParams });
  }

  //Add Card
  addCard(card: Card): Observable<Card> {
    card.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Card>(this.baseUrl, card);
  }

  deleteCard(id: string): Observable<Card> {
    return this.http.delete<Card>(this.baseUrl + '/' + id);
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(this.baseUrl + '/' + card.id, card);
  }
}
