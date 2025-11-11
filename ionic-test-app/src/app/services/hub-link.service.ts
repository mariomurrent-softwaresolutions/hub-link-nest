import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HubLinkConfig, Link, Category } from '../models/hub-link.model';

@Injectable({
  providedIn: 'root'
})
export class HubLinkService {
  // Update this URL to point to your running Hub Link Nest application
  private readonly HUB_LINK_NEST_URL = 'http://localhost:5173';
  
  private configSubject = new BehaviorSubject<HubLinkConfig | null>(null);
  public config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Load configuration from Hub Link Nest application
   */
  loadConfig(): Observable<HubLinkConfig> {
    return this.http.get<HubLinkConfig>(`${this.HUB_LINK_NEST_URL}/config.json`).pipe(
      tap(config => this.configSubject.next(config)),
      catchError(error => {
        console.error('Error loading Hub Link Nest config:', error);
        return throwError(() => new Error('Failed to load configuration. Make sure Hub Link Nest is running.'));
      })
    );
  }

  /**
   * Get all categories
   */
  getCategories(): Category[] {
    return this.configSubject.value?.categories || [];
  }

  /**
   * Get all links
   */
  getLinks(): Link[] {
    return this.configSubject.value?.links || [];
  }

  /**
   * Filter links by category
   */
  filterLinksByCategory(categoryId: string): Link[] {
    const links = this.getLinks();
    if (!categoryId) {
      return links;
    }
    return links.filter(link => link.categories.includes(categoryId));
  }

  /**
   * Search links by title or description
   */
  searchLinks(query: string): Link[] {
    const links = this.getLinks();
    if (!query) {
      return links;
    }
    const lowerQuery = query.toLowerCase();
    return links.filter(link => 
      link.title.toLowerCase().includes(lowerQuery) ||
      link.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Filter and search links
   */
  filterAndSearchLinks(categoryId: string, query: string): Link[] {
    let links = this.getLinks();
    
    // Filter by category first
    if (categoryId) {
      links = links.filter(link => link.categories.includes(categoryId));
    }
    
    // Then search
    if (query) {
      const lowerQuery = query.toLowerCase();
      links = links.filter(link => 
        link.title.toLowerCase().includes(lowerQuery) ||
        link.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    return links;
  }

  /**
   * Get company configuration
   */
  getCompanyConfig() {
    return this.configSubject.value?.config;
  }
}
