// src/config/roles.config.js

import Auth from '../screens/auth/main';
import Client from '../screens/client/main';
import Coach from '../screens/coach/main';
import Advertiser from '../screens/advertiser/main';
import Product from '../screens/product/main';

// Define constants for roles (to keep consistency across app)
export const Roles = {
  CLIENT: "client",
  COACH: "coach",
  ADVERTISER: "advertiser",
  PRODUCT: "product",
  AUTH: "auth",
};

// Map roles to screens
export const roleScreens = {
  [Roles.AUTH]: Auth,
  [Roles.CLIENT]: Client,
  [Roles.COACH]: Coach,
  [Roles.ADVERTISER]: Advertiser,
  [Roles.PRODUCT]: Product,
};
