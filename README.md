# Setup Instructions

## 1. Create a new Angular project
- Create a new Angular project:
  ng new your-project-name

- Navigate to your project directory:
  cd your-project-name

## 2. Install dependencies

- Install Chart.js:
  npm install chart.js

- Install ng2-charts:
  npm install ng2-charts

- Add ng2-charts to your project:
  ng add ng2-charts

- Add Angular Material:
  ng add @angular/material

- Install Auth0 Angular JWT (choose one):
  npm install @auth0/angular-jwt

-Add components: 
ng g c components/menu --skip-tests

-Change App config 

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables())
  ]
};
