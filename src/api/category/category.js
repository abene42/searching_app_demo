import apiClient from "../client";

const searchCategoryByName = (data) => apiClient.post("/category/search",data);

export default {
    searchCategoryByName
};