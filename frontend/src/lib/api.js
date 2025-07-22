import { axiosInstance } from "./axios.js"
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};


export const completeOnboarding = async (onboardingData) => {
  const res = await axiosInstance.post("/auth/onboarding", onboardingData);
  return res.data;
};

export const login = async(loginData)=>{
    const res = await axiosInstance.post("/auth/login", loginData)
    return res.data
}