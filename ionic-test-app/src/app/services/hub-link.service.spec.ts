import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HubLinkService } from './hub-link.service';
import { HubLinkConfig } from '../models/hub-link.model';

describe('HubLinkService', () => {
  let service: HubLinkService;
  let httpMock: HttpTestingController;

  const mockConfig: HubLinkConfig = {
    config: {
      adminEnabled: false,
      companyName: 'Test Company',
      companyTagline: 'Test Tagline',
      theme: {
        primary: '217 91% 60%',
        primaryForeground: '0 0% 100%',
        accent: '189 94% 43%',
        accentForeground: '0 0% 100%',
        background: '210 40% 98%',
        foreground: '222 47% 11%',
        card: '0 0% 100%',
        cardForeground: '222 47% 11%',
        secondary: '214 32% 91%',
        secondaryForeground: '222 47% 11%',
        muted: '210 40% 96%',
        mutedForeground: '215 16% 47%',
        border: '214 32% 91%'
      }
    },
    categories: [
      { id: 'hr', name: 'HR', icon: 'Users' },
      { id: 'it', name: 'IT', icon: 'Laptop' }
    ],
    links: [
      {
        id: '1',
        title: 'Test Link 1',
        description: 'Test Description 1',
        url: 'https://test1.com',
        categories: ['hr']
      },
      {
        id: '2',
        title: 'Test Link 2',
        description: 'Test Description 2',
        url: 'https://test2.com',
        categories: ['it']
      },
      {
        id: '3',
        title: 'Another Link',
        description: 'Another Description',
        url: 'https://test3.com',
        categories: ['hr', 'it']
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HubLinkService]
    });
    service = TestBed.inject(HubLinkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadConfig', () => {
    it('should load configuration from Hub Link Nest', (done) => {
      service.loadConfig().subscribe(config => {
        expect(config).toEqual(mockConfig);
        expect(config.config.companyName).toBe('Test Company');
        expect(config.categories.length).toBe(2);
        expect(config.links.length).toBe(3);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5173/config.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockConfig);
    });

    it('should handle error when loading config fails', (done) => {
      service.loadConfig().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.message).toContain('Failed to load configuration');
          done();
        }
      });

      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.error(new ProgressEvent('error'));
    });
  });

  describe('getCategories', () => {
    it('should return categories after config is loaded', (done) => {
      service.loadConfig().subscribe(() => {
        const categories = service.getCategories();
        expect(categories.length).toBe(2);
        expect(categories[0].id).toBe('hr');
        expect(categories[1].id).toBe('it');
        done();
      });

      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.flush(mockConfig);
    });

    it('should return empty array before config is loaded', () => {
      const categories = service.getCategories();
      expect(categories).toEqual([]);
    });
  });

  describe('getLinks', () => {
    it('should return links after config is loaded', (done) => {
      service.loadConfig().subscribe(() => {
        const links = service.getLinks();
        expect(links.length).toBe(3);
        expect(links[0].title).toBe('Test Link 1');
        done();
      });

      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.flush(mockConfig);
    });

    it('should return empty array before config is loaded', () => {
      const links = service.getLinks();
      expect(links).toEqual([]);
    });
  });

  describe('filterLinksByCategory', () => {
    beforeEach((done) => {
      service.loadConfig().subscribe(() => done());
      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.flush(mockConfig);
    });

    it('should filter links by category', () => {
      const hrLinks = service.filterLinksByCategory('hr');
      expect(hrLinks.length).toBe(2);
      expect(hrLinks.every(link => link.categories.includes('hr'))).toBe(true);
    });

    it('should return all links when no category is specified', () => {
      const allLinks = service.filterLinksByCategory('');
      expect(allLinks.length).toBe(3);
    });

    it('should return links that match IT category', () => {
      const itLinks = service.filterLinksByCategory('it');
      expect(itLinks.length).toBe(2);
      expect(itLinks.every(link => link.categories.includes('it'))).toBe(true);
    });
  });

  describe('searchLinks', () => {
    beforeEach((done) => {
      service.loadConfig().subscribe(() => done());
      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.flush(mockConfig);
    });

    it('should search links by title', () => {
      const results = service.searchLinks('Test Link');
      expect(results.length).toBe(2);
      expect(results.every(link => link.title.includes('Test Link'))).toBe(true);
    });

    it('should search links by description', () => {
      const results = service.searchLinks('Description 1');
      expect(results.length).toBe(1);
      expect(results[0].description).toContain('Description 1');
    });

    it('should return all links when search query is empty', () => {
      const results = service.searchLinks('');
      expect(results.length).toBe(3);
    });

    it('should be case insensitive', () => {
      const results = service.searchLinks('test link');
      expect(results.length).toBe(2);
    });

    it('should return empty array when no matches found', () => {
      const results = service.searchLinks('nonexistent');
      expect(results.length).toBe(0);
    });
  });

  describe('filterAndSearchLinks', () => {
    beforeEach((done) => {
      service.loadConfig().subscribe(() => done());
      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.flush(mockConfig);
    });

    it('should combine category filter and search', () => {
      const results = service.filterAndSearchLinks('hr', 'Test');
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('1');
    });

    it('should work with only category filter', () => {
      const results = service.filterAndSearchLinks('hr', '');
      expect(results.length).toBe(2);
    });

    it('should work with only search query', () => {
      const results = service.filterAndSearchLinks('', 'Link 2');
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('2');
    });

    it('should return all links when no filters applied', () => {
      const results = service.filterAndSearchLinks('', '');
      expect(results.length).toBe(3);
    });
  });

  describe('getCompanyConfig', () => {
    it('should return company config after loading', (done) => {
      service.loadConfig().subscribe(() => {
        const config = service.getCompanyConfig();
        expect(config).toBeDefined();
        expect(config?.companyName).toBe('Test Company');
        expect(config?.companyTagline).toBe('Test Tagline');
        done();
      });

      const req = httpMock.expectOne('http://localhost:5173/config.json');
      req.flush(mockConfig);
    });

    it('should return undefined before config is loaded', () => {
      const config = service.getCompanyConfig();
      expect(config).toBeUndefined();
    });
  });
});
