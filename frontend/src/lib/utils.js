import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials:true
})
