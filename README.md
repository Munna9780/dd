# Product Showcase with Supabase

A Next.js application for showcasing products with real-time updates using Supabase.

## Features

- Product showcase with grid layout
- Real-time updates when products change
- Admin interface for adding products
- CSV import functionality
- Responsive design

## Deployment

### 1. Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add these environment variables in Vercel project settings:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Deploy!

### 2. Alternative Deployment Options

#### Self-hosting
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
3. The app will be available on port 3000 by default

#### Docker
1. Build the Docker image:
   ```bash
   docker build -t product-showcase .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=your_url -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key product-showcase
   ```

## Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000`

## Adding Products

1. Through Admin Interface:
   - Visit `/admin/add-product`
   - Fill in the product details
   - Submit

2. Through CSV Import:
   - Visit `/admin/import-products`
   - Use the sample CSV as template
   - Upload your CSV file
