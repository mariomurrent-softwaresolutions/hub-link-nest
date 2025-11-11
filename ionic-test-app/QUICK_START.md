# Ionic Test Application - Quick Reference

## What is this?

This is a test application built with **Ionic Angular** to validate and test the Hub Link Nest functionality. It demonstrates how to:

- Consume the Hub Link Nest `config.json` API
- Display categories and links in a mobile-optimized interface
- Implement search and filtering
- Test the application on mobile devices

## Quick Start

### Prerequisites

- Node.js 18 or later
- Hub Link Nest running on `http://localhost:5173`

### Setup and Run

```bash
# Navigate to the test app directory
cd ionic-test-app

# Install dependencies
npm install

# Start the development server
npm start
# or
ionic serve

# The app will open at http://localhost:8100
```

### Run Tests

```bash
cd ionic-test-app
npm test
```

### Using the Quick Start Script

```bash
cd ionic-test-app
./quick-start.sh
```

The script will:
1. Check if Node.js is installed
2. Install dependencies if needed
3. Check if Hub Link Nest is running
4. Give you options to start dev server, run tests, or build

## What Gets Tested

### 1. Configuration Loading
- ✅ Fetches `config.json` from Hub Link Nest
- ✅ Validates data structure
- ✅ Handles connection errors

### 2. Data Display
- ✅ Shows company name and tagline
- ✅ Displays all categories
- ✅ Renders link cards with images
- ✅ Responsive grid layout

### 3. Category Filtering
- ✅ Click category to filter links
- ✅ Click again to clear filter
- ✅ Visual feedback for selected category

### 4. Search Functionality
- ✅ Search by link title
- ✅ Search by description
- ✅ Case-insensitive search
- ✅ Real-time filtering

### 5. Combined Operations
- ✅ Filter by category + search
- ✅ Clear filters independently
- ✅ Correct result counts

## Project Structure

```
ionic-test-app/
├── src/
│   ├── app/
│   │   ├── home/                    # Main page
│   │   │   ├── home.page.ts         # Component logic
│   │   │   ├── home.page.html       # Template
│   │   │   └── home.page.scss       # Styles
│   │   ├── services/
│   │   │   ├── hub-link.service.ts      # API service
│   │   │   └── hub-link.service.spec.ts # Unit tests
│   │   ├── models/
│   │   │   └── hub-link.model.ts    # TypeScript interfaces
│   │   ├── app.component.ts         # Root component
│   │   └── app.routes.ts            # Routing config
│   ├── theme/                       # Ionic theme
│   ├── index.html                   # HTML entry
│   └── main.ts                      # Bootstrap
├── README.md                        # This file
├── TESTING.md                       # Detailed testing guide
├── quick-start.sh                   # Setup script
├── package.json                     # Dependencies
└── angular.json                     # Angular config
```

## Key Files

### `src/app/services/hub-link.service.ts`
Main service that:
- Fetches config from `http://localhost:5173/config.json`
- Provides methods for filtering and searching
- Manages state with RxJS

### `src/app/home/home.page.ts`
Main UI component that:
- Loads data on init
- Handles user interactions
- Manages search and filter state

### `src/app/services/hub-link.service.spec.ts`
Comprehensive unit tests covering:
- Config loading
- Category filtering
- Link searching
- Combined operations
- Error handling

## Common Tasks

### Change Hub Link Nest URL

Edit `src/app/services/hub-link.service.ts`:

```typescript
private readonly HUB_LINK_NEST_URL = 'http://your-server:port';
```

### Add New Tests

Create or edit `*.spec.ts` files:

```typescript
it('should do something', () => {
  // Your test code
  expect(result).toBe(expected);
});
```

### Customize Theme

Edit `src/theme/variables.scss` to change colors and styling.

### Build for Production

```bash
npm run build
# Output in www/ directory
```

### Test on Mobile

#### iOS
```bash
ionic capacitor add ios
ionic capacitor run ios
```

#### Android
```bash
ionic capacitor add android
ionic capacitor run android
```

## Troubleshooting

### Cannot connect to Hub Link Nest

**Problem:** App shows "Connection Error"

**Solutions:**
1. Make sure Hub Link Nest is running: `npm run dev` in the main directory
2. Check the URL is correct: `http://localhost:5173`
3. Test direct access: Open `http://localhost:5173/config.json` in browser
4. CORS issues: Both apps are on localhost, should work fine

### npm install fails

**Problem:** Dependencies won't install

**Solutions:**
1. Update Node.js to v18 or later
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and try again
4. Check npm registry: `npm config get registry`

### Tests don't run

**Problem:** `npm test` fails

**Solutions:**
1. Make sure all dependencies are installed
2. Check Chrome is installed (required for Karma)
3. Run with headless Chrome: Add `--browsers=ChromeHeadless` to test script

### Port 8100 already in use

**Problem:** Cannot start dev server

**Solutions:**
1. Stop other Ionic apps: `pkill -f "ionic serve"`
2. Use different port: `ionic serve --port=8101`
3. Find and kill process: `lsof -ti:8100 | xargs kill`

## Documentation

- **[README.md](README.md)** - This file (quick reference)
- **[TESTING.md](TESTING.md)** - Comprehensive testing guide
- **[../README.md](../README.md)** - Hub Link Nest main documentation

## Next Steps

1. ✅ Install dependencies
2. ✅ Start Hub Link Nest
3. ✅ Run the test app
4. ✅ Try all features
5. ✅ Run unit tests
6. ⬜ Test on mobile devices
7. ⬜ Report any issues found

## Contributing

Found a bug or want to add a feature?

1. Create an issue in the main repository
2. Make your changes
3. Add tests for new functionality
4. Submit a pull request

## License

MIT License - Same as Hub Link Nest

---

**Need Help?**
- Check the [TESTING.md](TESTING.md) for detailed testing instructions
- Review Hub Link Nest [main README](../README.md)
- Open an issue on GitHub
