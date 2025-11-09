# Hub Link Nest

A modern, customizable company intranet portal for managing and organizing quick access to all your important applications, resources, and tools. Built with React, TypeScript, and Tailwind CSS.

## Overview

Hub Link Nest is a centralized link management system designed for company intranets. It provides a clean, searchable interface where employees can quickly find and access all the tools and resources they need for their daily work. The application features category-based filtering, search functionality, and a responsive design that works on all devices.

### Key Features

- 🔍 **Quick Search**: Instantly find links by title or description
- 🏷️ **Category Filtering**: Organize links into custom categories (HR, IT, Tools, Documentation, Communication, etc.)
- 🎨 **Customizable Theming**: Fully customizable color scheme via configuration
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔧 **Two Deployment Modes**:
  - **Standalone Mode**: Use static `config.json` file for simple deployments
  - **Supabase Mode**: Enable admin features with database backend for dynamic management
- 👤 **Admin Portal** (Supabase mode): Web-based interface to manage links, categories, and configuration
- 🐳 **Docker Ready**: Pre-configured Docker setup for easy deployment

## Screenshots

### Main Dashboard
*Screenshot placeholder - Add your dashboard screenshot here*

### Category Filtering
*Screenshot placeholder - Add your category filtering screenshot here*

### Admin Portal
*Screenshot placeholder - Add your admin portal screenshot here*

## Demo

🔗 **Live Demo**: [Add your demo link here]

You can try out Hub Link Nest with the default configuration. The demo includes sample links and categories to showcase the functionality.

## Project info

**URL**: https://lovable.dev/projects/c6a358d0-ce81-4012-9be7-cf702babf666

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- For Supabase mode: A Supabase account and project

### Local Development

Follow these steps to run Hub Link Nest locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd hub-link-nest

# Step 3: Install the dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Configuration

By default, the application uses the `public/config.json` file for configuration. You can customize:
- Company name and tagline
- Categories and their icons
- Links with titles, descriptions, URLs, and images
- Theme colors

Example `config.json` structure:
```json
{
  "config": {
    "adminEnabled": false,
    "companyName": "Your Company",
    "companyTagline": "Your Digital Workplace",
    "theme": {
      "primary": "217 91% 60%",
      ...
    }
  },
  "categories": [...],
  "links": [...]
}
```

### Development with Lovable

You can also edit this project using [Lovable](https://lovable.dev/projects/c6a358d0-ce81-4012-9be7-cf702babf666). Changes made via Lovable will be committed automatically to this repo.

## Technology Stack

Hub Link Nest is built with modern web technologies:

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn-ui (Radix UI primitives)
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query (React Query) 5.83.0
- **Backend (Optional)**: Supabase 2.80.0
- **Icons**: Lucide React 0.462.0
- **Form Handling**: React Hook Form 7.61.1 with Zod validation

## Docker Deployment

This project supports two deployment variants using Docker:

### Option 1: Local Deployment with config.json

This deployment uses the static `config.json` file for configuration without requiring Supabase.

#### Prerequisites
- Docker and Docker Compose installed

#### Steps

1. **Clone the repository**
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Build and run with Docker Compose**
```sh
# For Docker Compose V2 (recommended)
docker compose up -d

# Or for Docker Compose V1
docker-compose up -d
```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`

4. **Customize configuration (optional)**
   - Edit `public/config.json` to customize company name, links, categories, and theme
   - The changes will be reflected immediately due to the volume mount
   - Restart the container if needed: `docker compose restart` (or `docker-compose restart`)

5. **Stop the application**
```sh
# For Docker Compose V2
docker compose down

# Or for Docker Compose V1
docker-compose down
```

### Option 2: Deployment with Supabase

This deployment connects to a Supabase backend for dynamic configuration and admin features.

#### Prerequisites
- Docker and Docker Compose installed
- Supabase project with configured database (see `supabase/migrations`)

#### Steps

1. **Clone the repository**
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Configure Supabase credentials**
   - Copy the example environment file:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and fill in your Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
     VITE_SUPABASE_PROJECT_ID=your-project-id
     ```

3. **Build and run with Docker Compose**
```sh
# For Docker Compose V2 (recommended)
docker compose -f docker-compose.supabase.yml up -d

# Or for Docker Compose V1
docker-compose -f docker-compose.supabase.yml up -d
```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - Admin interface available at `http://localhost:8080/admin`

5. **Stop the application**
```sh
# For Docker Compose V2
docker compose -f docker-compose.supabase.yml down

# Or for Docker Compose V1
docker-compose -f docker-compose.supabase.yml down
```

### Building Docker Image Manually

If you prefer to build and run the Docker image manually:

#### For local deployment:
```sh
docker build -t hub-link-nest .
docker run -p 8080:80 -v $(pwd)/public/config.json:/usr/share/nginx/html/config.json:ro hub-link-nest
```

#### For Supabase deployment:
```sh
docker build \
  --build-arg VITE_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key \
  --build-arg VITE_SUPABASE_PROJECT_ID=your-project-id \
  -t hub-link-nest-supabase .
docker run -p 8080:80 hub-link-nest-supabase
```

### Deployment to Production

For production deployments, consider:
- Using a reverse proxy (nginx, Traefik, or Caddy) with SSL/TLS certificates
- Setting up proper environment variables management
- Configuring health checks and monitoring
- Using orchestration platforms like Kubernetes or Docker Swarm for scaling

## Additional Resources

### Editing Options

There are several ways to edit and maintain this application:

**Use Lovable**
Simply visit the [Lovable Project](https://lovable.dev/projects/c6a358d0-ce81-4012-9be7-cf702babf666) and start prompting. Changes made via Lovable will be committed automatically to this repo.

**Use Your Preferred IDE**
Clone this repo and push changes using your favorite IDE. Pushed changes will also be reflected in Lovable.

**Edit Directly in GitHub**
- Navigate to the desired file(s)
- Click the "Edit" button (pencil icon) at the top right
- Make your changes and commit

**Use GitHub Codespaces**
- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment

### Custom Domain

Yes, you can connect a custom domain to your Lovable project!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## License

This project is part of the Lovable platform.

## Support

For issues and questions:
- Open an issue in this repository
- Visit the [Lovable documentation](https://docs.lovable.dev)
- Contact the development team
