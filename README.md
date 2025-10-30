# Vaccine Market Analytics Dashboard

A modern React-based dashboard for global vaccine market analytics. Converted from the Python/Plotly Dash implementation to a lightweight, Vercel-deployable React application.

## Features

- **8 Analysis Modules:**
  - Epidemiology Analysis
  - Vaccination Rate Analysis
  - Pricing Analysis
  - CAGR Analysis
  - MSA Comparison
  - Procurement Analysis
  - Brand-Demographic Analysis
  - FDF Analysis

- **Modern UI:**
  - Material-UI components
  - Dark/Light theme support
  - Responsive design
  - Collapsible sidebar navigation
  - Interactive charts with Recharts

- **Features:**
  - Multi-filter data analysis
  - KPI cards with key metrics
  - Interactive charts (Bar, Line, Pie)
  - Client-side data generation (no server required)
  - Fast and lightweight

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd vaccine-dashboard-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

To build the application for production:

```bash
npm run build
```

This creates an optimized build in the `build` folder.

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect the React app and deploy it

The `vercel.json` configuration file is already included for optimal deployment.

## Project Structure

```
vaccine-dashboard-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BarChart.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── Header.jsx
│   │   ├── LineChart.jsx
│   │   ├── PieChart.jsx
│   │   ├── ProgressCircle.jsx
│   │   └── StatBox.jsx
│   ├── scenes/
│   │   ├── epidemiology/
│   │   ├── vaccination-rate/
│   │   ├── global/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   └── home/
│   ├── utils/
│   │   └── dataGenerator.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── theme.js
├── package.json
├── vercel.json
└── README.md
```

## Key Technologies

- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **Recharts** - Chart library
- **React Router** - Routing
- **React Pro Sidebar** - Sidebar navigation

## Data Generation

The dashboard uses client-side data generation to create comprehensive vacation market data. This eliminates the need for a backend server and makes the application fully static and deployable anywhere.

The data includes:
- Multiple regions and countries
- Various diseases and vaccine brands
- Pricing and market metrics
- Time-series data from 2021-2035

## Notes

- This dashboard uses demo/synthetic data for illustration purposes only
- No real-world data is associated with this application
- For production use, replace the data generator with actual API endpoints

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

