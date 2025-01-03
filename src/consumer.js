import axios from "axios";

async function fetchProduct(productId) {
  const response = await axios.get(`http://localhost:1234/product/${productId}`);
  return response.data;
}

export default { fetchProduct };
