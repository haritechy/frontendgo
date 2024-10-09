const API_URL = process.env.REACT_APP_PRODUCTION_API_URL; 
export const LOGIN_API = `${API_URL}/user/login`;
export const SIGNUP_API = `${API_URL}/user/create`;
export const BOT_API = `${API_URL}/chat/generate`;
export const CHAT_HISTORY_API = `${API_URL}/chat/history`;