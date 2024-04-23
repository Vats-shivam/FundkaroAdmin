import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext({})

export function CategoryContextProvider({ children }) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await axios.get('/api/loan/category')
        console.log(data);
        if (data.success) {
          setCategory(data.category);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchCategory();
  }, [])
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}