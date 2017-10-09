// change production server url when publishing the app
export const API_URL = process.env.NODE_ENV === 'production' ? 'https://ancient-sands-71156.herokuapp.com' : 'http://localhost:3000';