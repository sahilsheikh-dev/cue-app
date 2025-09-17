// src/config/roles.config.js

import Auth from '../screens/Auth/Auth';
import Client from '../screens/Client/Main';
import Coach from '../screens/Coach/Main';
import Advertiser from '../screens/Advertiser/Main';
import Product from '../screens/Product/Main';

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
