export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
export const POST_URL = `${BASE_URL}/api/posts`;
export const UPLOAD_URL = `${BASE_URL}/api/uploads`;
export const SLUG_URL = `${BASE_URL}/api/posts/slug`;
