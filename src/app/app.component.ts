import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from './services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface Article {
  id: number;
  brandName: string;
  name: string;
  descriptionText?: string;
  articles: {
    id: number;
    shortDescription: string;
    price: number;
    unit: string;
    pricePerUnitText: string;
    image: string;
  }[];
}

@Component({
  selector: 'app-root',
  imports: [ CommonModule, HttpClientModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ArticleService]
})
export class AppComponent implements OnInit {
  title = 'BeerApp';
  articles: Article[] = [];
  isDetailView: boolean = true;
  isBottleView: boolean = false;
  isAscending: boolean = true;
  isFiltered: boolean = false;
 
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((data: Article[]) => {
      this.articles = data;
    });
  }

  toggleView() {
    this.isDetailView = !this.isDetailView; 
    this.isBottleView = !this.isBottleView;
  }

  toggleSortOrder() {
    this.isAscending = !this.isAscending;
    const sortBy = this.isAscending ? 'priceAsc' : 'priceDesc';
    this.articleService.getArticles(undefined, sortBy).subscribe((data: Article[]) => {
      this.articles = data;
    });
  }

  toggleFilter() {
    this.isFiltered = !this.isFiltered;
    const filter = this.isFiltered ? '2,00 €/Liter' : undefined;
    this.articleService.getArticles(filter).subscribe((data: Article[]) => {
      this.articles = data;
    });
  }
}
