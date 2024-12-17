export const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Returns true if the token exists
  };
  
  export const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login page
  };
  