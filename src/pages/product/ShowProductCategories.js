import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import ExcelDownload from "../../components/DownloadExcel";

const ShowProductCategories = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchAllCategories();
  }, []);
  const fetchAllCategories = async () => {
    try {
      const product = await axios.get(
        process.env.REACT_APP_BASE_URL + "product/categories"
      );
      if (typeof product !== "undefined") {
        // console.log(product);

        setProducts((p) => product.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const categoryList = products.map((pro, i) => {
    return {
      slno: i + 1,
      category: pro.category,
      warranty: pro.warranty,
    };
  });
  return (
    <>
      <Navbar />
      <ExcelDownload data={categoryList} filename={Date.now()} />
      <div className="conatiner p-3 text-left">
        <table className="table-auto w-full">
          <thead className="bg-teal-600">
            <tr>
              <th className="p-2 w-1/12">sl.no</th>
              <th className="p-2 w-1/5">category</th>
              <th className="p-2 w-1/5">warranty</th>
              <th className="p-2 w-2/5">image</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0
              ? products.map((pro, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{pro.category}</td>
                      <td>{pro.warranty}</td>
                      <td>
                        {pro.image.image_data ? (
                          <img
                            className="w-1/5"
                            src={pro.image.image_data}
                            alt={pro.image.image_name}
                          />
                        ) : (
                          "No Image Found"
                        )}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowProductCategories;
