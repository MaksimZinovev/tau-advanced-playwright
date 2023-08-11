import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';
import path from 'path';

// require('dotenv').config();
export const STORAGE_STATE_APPL = path.join(__dirname, './applitoolsStorageState.json');
export const STORAGE_STATE_API = path.join(__dirname, './apiStorageState.json');
export const STORAGE_STATE_SD = path.join(__dirname, './sdStorageStateUser.json');
require('dotenv').config();

export default defineConfig({
  reporter: [['html'], ['list']],
  // globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  // timeout: 5000,
  use: {
    // storageState: 'storageState.json',
    trace: 'on',
    baseURL: process.env.ENV === 'production' 
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging' 
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },
  projects: [
    
    { 
      name: 'auth-setup', 
      testMatch: /auth-setup\.ts/ 
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
       },
    },
    {
      name: 'chromium-auth',
      use: { 
        ...devices['Desktop Chrome'] ,
        // storageState: '.auth/admin.json', //use this in case you have multiple projects one per user
      },
      dependencies: ['auth-setup'],
    },
    {
      name: 'setup-applitools',
      testMatch: /applitools-setup\.ts/,
    },
    {
      name: 'chromium-appl',
      use: { 
        ...devices['Desktop Chrome'] ,
        storageState: STORAGE_STATE_APPL,
        headless: false,
      
      },
      dependencies: ['setup-applitools']
    },
    {
      name: 'setup-api-login',
      testMatch: /api-setup\.ts/,
    },
    {
      name: 'chromium-api',
      use: { 
        ...devices['Desktop Chrome'] ,
        storageState: STORAGE_STATE_API,
        headless: false,
      
      },
      dependencies: ['setup-api-login']
    },
    {
      name: 'setup-saucedemo',
      testMatch: /saucedemo-setup\.ts/,
    },
    {
      name: 'chromium-saucedemo',
      use: { 
        ...devices['Desktop Chrome'] ,
        storageState: STORAGE_STATE_SD,
        headless: false,
      
      },
      dependencies: ['setup-saucedemo']
    },
  ],
});
