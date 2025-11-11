# Ionic Test Application for Hub Link Nest

This is an Ionic Angular test application created to test the Hub Link Nest functionality.

## Overview

This test application demonstrates how to:
- Fetch and display configuration from Hub Link Nest
- Display categories and links
- Implement search functionality
- Test the responsive design
- Validate data structures

## Features

- **Configuration Loading**: Tests loading and parsing of `config.json`
- **Category Display**: Shows all categories with their icons
- **Link Grid**: Displays links in a card-based layout
- **Search Functionality**: Tests filtering links by title and description
- **Category Filtering**: Tests filtering links by category
- **Responsive Design**: Tests the UI on different screen sizes (mobile, tablet, desktop)

## Prerequisites

- Node.js (v18 or later)
- npm
- Ionic CLI (`npm install -g @ionic/cli`)

## Setup

1. Navigate to the ionic-test-app directory:
```bash
cd ionic-test-app
```

2. Install dependencies:
```bash
npm install
```

3. Make sure the Hub Link Nest application is running on `http://localhost:5173` (or update the API URL in the service)

## Running the App

### Development Server

Start the Ionic development server:
```bash
ionic serve
```

Or use Angular CLI directly:
```bash
npm start
```

The app will be available at `http://localhost:8100`

### Run on iOS Simulator

```bash
ionic capacitor run ios
```

### Run on Android Emulator

```bash
ionic capacitor run android
```

### Build for Production

```bash
ionic build --prod
```

## Testing

Run unit tests:
```bash
npm test
```

Run end-to-end tests:
```bash
npm run e2e
```

## Project Structure

```
ionic-test-app/
├── src/
│   ├── app/
│   │   ├── home/              # Home page component
│   │   ├── services/          # Hub Link Nest service
│   │   ├── models/            # TypeScript interfaces
│   │   └── app.component.ts   # Root component
│   ├── theme/                 # Ionic theme customization
│   ├── index.html             # HTML entry point
│   └── main.ts               # Application bootstrap
├── package.json              # Dependencies
├── angular.json              # Angular configuration
├── ionic.config.json         # Ionic configuration
└── tsconfig.json            # TypeScript configuration
```

## What's Being Tested

### 1. Configuration Loading
- Fetches `config.json` from the Hub Link Nest application
- Validates the structure of configuration data
- Tests theme application

### 2. Data Display
- Renders categories with appropriate icons
- Displays link cards with images, titles, and descriptions
- Tests responsive grid layout

### 3. Search and Filter
- Tests search by title and description
- Tests category-based filtering
- Tests combined search and filter operations

### 4. User Interface
- Tests Ionic components integration
- Validates responsive design
- Tests navigation and routing

### 5. Error Handling
- Tests behavior when config.json is unavailable
- Validates error messages
- Tests fallback behavior

## Integration with Hub Link Nest

This test app connects to the Hub Link Nest application to:

1. **Fetch Configuration**: Makes HTTP GET request to `/config.json`
2. **Display Data**: Renders the same data structure in a mobile-optimized interface
3. **Test Features**: Validates search, filter, and navigation functionality
4. **UI Testing**: Tests the application on mobile devices and different screen sizes

## Customization

To customize the test app:

1. **Change API URL**: Update the `HUB_LINK_NEST_URL` in `src/app/services/hub-link.service.ts`
2. **Modify Theme**: Edit `src/theme/variables.scss`
3. **Add Tests**: Create test files in `src/app/**/*.spec.ts`

## Architecture

The test application follows Ionic/Angular best practices:

- **Services**: `HubLinkService` handles all API communication
- **Components**: Reusable UI components for categories and links
- **Models**: TypeScript interfaces for type safety
- **Routing**: Angular router for navigation
- **Ionic Components**: Uses Ionic UI components for mobile-optimized interface

## Contributing

To add more tests or features:

1. Add new test cases in the appropriate `*.spec.ts` files
2. Create new pages in `src/app/` directory
3. Update the service to include new API calls
4. Run tests to ensure everything works

## Troubleshooting

### Cannot connect to Hub Link Nest
- Ensure Hub Link Nest is running on the expected URL
- Check CORS settings if running on different domains
- Verify network connectivity

### Build errors
- Delete `node_modules` and run `npm install` again
- Clear Ionic cache: `ionic cache clean`
- Update dependencies: `npm update`

## License

MIT License - Same as Hub Link Nest project
