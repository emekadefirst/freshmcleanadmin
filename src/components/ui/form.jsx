import React from "react";


const apiBase = import.meta.env.VITE_API_URL;

const ContentManagement = () => {
    const ResourcePoint = {
        blogs: "blogs",
        faqs: "faqs",
        categories: "categories",
        testimonies: "testimonies",
      };
    const PostResourceContent = {
        blogs: ["title", "category_id", "content", "image"],
        faqs: ["title", "category_id", "content"],
        categories: ["name"],
        testimonies: ["user", "message"],
      };
      const GetResourceContent = {
        blogs: ["title", "category", "content", "image"],
        faqs: ["title", "category", "content"],
        categories: ["name"],
        testimonies: ["user", "message"],
      };
}