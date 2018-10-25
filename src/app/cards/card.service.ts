import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICard } from "./card";

@Injectable({
    providedIn: 'root'
})
export class CardService {
    
    private apiUrl = 'https://deckofcardsapi.com/api/deck/';

    constructor(private http: HttpClient){
        this.getDeck();
    }

    getDeck(): Observable<string> {
        return this.http.get<string>(this.apiUrl + "new/shuffle/?deck_count=1").pipe();
    }

    draw(deckId: string): Observable<ICard[]> {
        return this.http.get<ICard[]>(this.apiUrl + deckId + "/draw/?count=1").pipe();
    }
}