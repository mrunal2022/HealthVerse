import React, { createContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    return (
        <BlogContext.Provider value={{selectedBlog, setSelectedBlog}}>
            {children}
        </BlogContext.Provider>
    );

};

export default BlogProvider;





