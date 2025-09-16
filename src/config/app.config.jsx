// src/config/app.config.js
import { API_URL, STRIPE_PK } from '@env';

export const BASE_API_URL = API_URL || 'http://localhost:9000';
export const STRIPE_PUBLISHABLE_KEY =
  STRIPE_PK ||
  'pk_test_51QUpeKAgw3asoEkcwZXNQBnVDY99IjwwIEzJZAIKw3iu3FaM2vFzlTObWHVhS3JXXhEAmUXIQSS4NovDy9WiXoLB0067DbJvYP';
