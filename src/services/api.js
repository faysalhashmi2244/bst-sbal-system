// API service for communicating with the backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_BASE_URL_USER = import.meta.env.VITE_API_BASE_URL_USER || "";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Use the error message from the API response if available
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }
  async requestUser(endpoint, options = {}) {
    const url = `${API_BASE_URL_USER}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Use the error message from the API response if available
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }
  // Events endpoints
  async getEvents(page = 1, limit = 100) {
    return this.request(`/events?page=${page}&limit=${limit}`);
  }

  async getUserEvents(address, page = 1, limit = 100) {
    return this.request(`/events/user/${address}?page=${page}&limit=${limit}`);
  }
  async getEventsSummary() {
    return this.request("/events/summary");
  }
  // Hard refresh - clear database and trigger full sync
  async hardRefresh() {
    return this.request("/hard-refresh", {
      method: "POST",
    });
  }

  // Health check
  async getHealth() {
    return this.request("/health");
  }

  // User endpoints
  async registerUser(userData) {
    return this.requestUser("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async checkUserExists(walletAddress) {
    return this.requestUser("/users/check", {
      method: "POST",
      body: JSON.stringify({ walletAddress }),
    });
  }

  async getUserProfile(walletAddress) {
    return this.requestUser(`/users/profile/${walletAddress}`);
  }

  async checkSponsorExists(sponsorId) {
    return this.requestUser("/users/check-sponsor", {
      method: "POST",
      body: JSON.stringify({ sponsorId }),
    });
  }

  async checkWalletAddressAndGetUserId(walletAddress) {
    return this.requestUser(`/users/check-wallet/${walletAddress}`);
  }
  // health check
  async getHealth() {
    return this.requestUser("/users/health");
  }
  async getUserTeam(walletAddress, maxDepth) {
    return this.requestUser(`/users/team/${walletAddress}?depth=${maxDepth}`);
  }

  // Add purchased package
  async addPurchasedPackage(packageData) {
    return this.requestUser("/users/package/purchase", {
      method: "POST",
      body: JSON.stringify(packageData),
    });
  }

  // Get purchased packages
  async getPurchasedPackages(walletAddress) {
    return this.requestUser(`/users/packages/${walletAddress}`);
  }
}

export const apiService = new ApiService();
export default apiService;
