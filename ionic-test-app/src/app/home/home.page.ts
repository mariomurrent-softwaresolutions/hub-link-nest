import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  searchOutline, 
  openOutline, 
  refreshOutline,
  alertCircleOutline 
} from 'ionicons/icons';
import { HubLinkService } from '../services/hub-link.service';
import { Link, Category } from '../models/hub-link.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class HomePage implements OnInit {
  companyName = '';
  companyTagline = '';
  categories: Category[] = [];
  allLinks: Link[] = [];
  filteredLinks: Link[] = [];
  selectedCategory = '';
  searchQuery = '';
  loading = true;
  error = '';

  constructor(private hubLinkService: HubLinkService) {
    addIcons({ 
      searchOutline, 
      openOutline, 
      refreshOutline,
      alertCircleOutline 
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = '';
    
    this.hubLinkService.loadConfig().subscribe({
      next: (config) => {
        this.companyName = config.config.companyName;
        this.companyTagline = config.config.companyTagline;
        this.categories = config.categories;
        this.allLinks = config.links;
        this.filteredLinks = [...this.allLinks];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load data';
        this.loading = false;
      }
    });
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  onCategorySelect(categoryId: string) {
    this.selectedCategory = this.selectedCategory === categoryId ? '' : categoryId;
    this.filterLinks();
  }

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value || '';
    this.filterLinks();
  }

  filterLinks() {
    this.filteredLinks = this.hubLinkService.filterAndSearchLinks(
      this.selectedCategory,
      this.searchQuery
    );
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  retry() {
    this.loadData();
  }
}
