// src/config/roles.config.js

import Client from '../screens/Client/Main';
import Coach from '../screens/Coach/Main';
import Advertiser from '../screens/Advertiser/Main';
import Product from '../screens/Product/Main';

// Define allowed roles
export const roleScreens = {
  user: Client,
  coach: Coach,
  advertiser: Advertiser,
  product: Product,
};
