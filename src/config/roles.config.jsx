// src/config/roles.config.js

import Auth from '../screens/auth/main';
import Client from '../screens/client/main';
import Coach from '../screens/coach/main';
import EventOrganizer from '../screens/eventOrganizer/main';
import ProductCompany from '../screens/productCompany/main';

// Define constants for roles (to keep consistency across app)
export const Roles = {
  CLIENT: "client",
  COACH: "coach",
  EVENTORGANIZER: "eventOrganizer",
  PRODUCTCOMPANY: "productCompany",
  AUTH: "auth",
};

// Map roles to screens
export const roleScreens = {
  [Roles.AUTH]: Auth,
  [Roles.CLIENT]: Client,
  [Roles.COACH]: Coach,
  [Roles.EVENTORGANIZER]: EventOrganizer,
  [Roles.PRODUCTCOMPANY]: ProductCompany,
};
