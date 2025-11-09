# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c6a358d0-ce81-4012-9be7-cf702babf666

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c6a358d0-ce81-4012-9be7-cf702babf666) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

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
docker-compose up -d
```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`

4. **Customize configuration (optional)**
   - Edit `public/config.json` to customize company name, links, categories, and theme
   - The changes will be reflected immediately due to the volume mount
   - Restart the container if needed: `docker-compose restart`

5. **Stop the application**
```sh
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
docker-compose -f docker-compose.supabase.yml up -d
```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - Admin interface available at `http://localhost:8080/admin`

5. **Stop the application**
```sh
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

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
