import { Injectable } from '@angular/core';
import { Article } from '../model/article.model';
import { Vendeur } from '../model/vendeur.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VendeurWrapper } from '../model/VendeurWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiURL: string = 'http://localhost:8080/articles/api';
  apiURLVen: string = 'http://localhost:8080/articles/ven';
  


  articles !: Article[]; //un tableau de articles
 // venegories : Vendeur[];

  constructor(private http : HttpClient) { 
    /* this.vendeurs = [ {idVen : 1, nomVen : "PC"},
                        {idVen : 2, nomVen : "Imprimante"}];  */
/*this.articles = [
  { idArticle : 1, nomArticle : "PC Asus", prixArticle : 3000.600, 
   dateCreation : new Date("01/14/2011"), vendeur : {idVen : 1, nomVen : "PC"}},
  { idArticle : 2, nomArticle : "Imprimante Epson", prixArticle : 450, 
  dateCreation : new Date("12/17/2010"), vendeur : {idVen : 2, nomVen : "Imprimante"}},
  { idArticle : 3, nomArticle :"Tablette Samsung", prixArticle : 900.123, 
  dateCreation : new Date("02/20/2020"),vendeur : {idVen : 1, nomVen : "PC"}}
  ];*/
  }
  

 
    listeArticle(): Observable<Article[]>{

      return this.http.get<Article[]>(this.apiURL);

      }
      
   
      ajouterArticle( prod: Article):Observable<Article>{
        return this.http.post<Article>(this.apiURL, prod, httpOptions);
        }
     
        supprimerArticle(id : number) {
          const url = `${this.apiURL}/${id}`;
          return this.http.delete(url, httpOptions);
          }
          
          consulterArticle(id: number): Observable<Article> {
            const url = `${this.apiURL}/${id}`;
            return this.http.get<Article>(url);
            }
            
            updateArticle(prod :Article) : Observable<Article>
            {
            return this.http.put<Article>(this.apiURL, prod, httpOptions);
            }
         
           
              listeVendeurs():Observable<VendeurWrapper>{
                return this.http.get<VendeurWrapper>(this.apiURLVen);
                }
                rechercherParVendeur(idVen: number):Observable< Article[]> {
                  const url = `${this.apiURL}/prodscat/${idVen}`;
                  return this.http.get<Article[]>(url);
                  }
                  rechercherParNom(nom: string):Observable< Article[]> {
                    const url = `${this.apiURL}/prodsByName/${nom}`;
                    return this.http.get<Article[]>(url);
                    }   
            /*consulterVendeur(id:number): Vendeur{ 
              return this.vendeurs.find(ven => ven.idVen == id)!;
              }*/
              ajouterVendeur( ven: Vendeur):Observable<Vendeur>{
                return this.http.post<Vendeur>(this.apiURLVen, ven, httpOptions);
                }
}
