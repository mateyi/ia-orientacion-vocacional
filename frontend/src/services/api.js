import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add JWT Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Do not clear on login attempts to preserve UI error message
      const isAuthEndpoint = error.config.url?.includes('/auth/login') || error.config.url?.includes('/auth/register');
      if (!isAuthEndpoint) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  async register(data) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Assessment Service
export const assessmentService = {
  async create(answers) {
    const response = await api.post('/assessments/', { answers });
    return response.data;
  },
  async getMyAssessments() {
    const response = await api.get('/assessments/me');
    return response.data;
  },
  async getById(id) {
    const response = await api.get(`/assessments/${id}`);
    return response.data;
  },
};

// Recommendation Service
export const recommendationService = {
  async generate(assessmentId) {
    const response = await api.post('/recommendations/', {
      assessment_id: assessmentId,
    });
    return response.data;
  },
  async getMyRecommendations() {
    const response = await api.get('/recommendations/me');
    return response.data;
  },
};

// Chat Service
export const chatService = {
  async sendMessage(message, assessmentId = null) {
    const response = await api.post('/chat/', {
      message,
      assessment_id: assessmentId,
    });
    return response.data;
  },
  async getHistory() {
    const response = await api.get('/chat/history');
    return response.data;
  },
};

export default api;
