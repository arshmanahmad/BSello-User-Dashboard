import axios from 'axios';

const API_BASE_URL = '/api/seller-panel';

// Create axios instance with default config
const sellerApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
sellerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
sellerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Account Management APIs
export const accountApi = {
  // Get all seller accounts with pagination
  getAccounts: async (params = {}) => {
    const { status, page = 1, limit = 10 } = params;
    const queryParams = new URLSearchParams();
    
    if (status) queryParams.append('status', status);
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    
    const response = await sellerApi.get(`/accounts?${queryParams}`);
    return response.data;
  },

  // Remove an account (soft delete)
  removeAccount: async (accountId) => {
    const response = await sellerApi.delete(`/accounts/${accountId}`);
    return response.data;
  },
};

// Bidding Control APIs
export const biddingApi = {
  // Enable/disable bidding for an account
  updateBidding: async (accountId, biddingData) => {
    const response = await sellerApi.put(`/accounts/${accountId}/bidding`, biddingData);
    return response.data;
  },

  // Get all bids for an account
  getBids: async (accountId) => {
    const response = await sellerApi.get(`/accounts/${accountId}/bids`);
    return response.data;
  },

  // Accept a bid and lock account
  acceptBid: async (accountId, bidId) => {
    const response = await sellerApi.post(`/accounts/${accountId}/bids/${bidId}/accept`);
    return response.data;
  },
};

// Account Locking APIs
export const lockingApi = {
  // Lock an account for a buyer
  lockAccount: async (accountId, lockData) => {
    const response = await sellerApi.post(`/accounts/${accountId}/lock`, lockData);
    return response.data;
  },

  // Unlock an account
  unlockAccount: async (accountId) => {
    const response = await sellerApi.post(`/accounts/${accountId}/unlock`);
    return response.data;
  },
};

// Deal Management APIs
export const dealApi = {
  // Complete a deal by sharing credentials
  completeDeal: async (dealData) => {
    const response = await sellerApi.post('/deals/complete', dealData);
    return response.data;
  },

  // Get deal details
  getDeal: async (dealId) => {
    const response = await sellerApi.get(`/deals/${dealId}`);
    return response.data;
  },

  // Get all seller deals with pagination
  getDeals: async (params = {}) => {
    const { status, page = 1, limit = 10 } = params;
    const queryParams = new URLSearchParams();
    
    if (status) queryParams.append('status', status);
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    
    const response = await sellerApi.get(`/deals?${queryParams}`);
    return response.data;
  },
};

export default sellerApi;
