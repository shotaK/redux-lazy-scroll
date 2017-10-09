import get from 'lodash.get';

export const processErrorRes = (error) => get(error, "response.data.error", "Request failed, please try refreshing the page");