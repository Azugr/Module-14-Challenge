import { UserLogin } from "../interfaces/UserLogin.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const login = async (userInfo: UserLogin) => {
  console.log("🟢 Step 1: Sending login request to backend...", userInfo);

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, { // ✅ Uses dynamic API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    console.log("🔍 Step 2: Response received - Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("❌ Step 3: Login failed with status:", res.status, "Message:", errorText);
      throw new Error(`Failed to login - Status: ${res.status} | Message: ${errorText}`);
    }

    const user = await res.json();
    console.log("✅ Step 4: Login successful!", user);
    return user;

  } catch (error) {
    console.error("🚨 Step 5: Error in login request:", error);
    throw error;
  }
};

export { login };
