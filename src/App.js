import { useEffect, useState } from "react";
import axios from "axios"

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);

  const [product, setProduct] = useState([])

  const fetchProduct = async () => {
    const prod = await axios.get('http://localhost:3500/product')
    const res = await prod.data
    console.log(res);
  }

  useEffect(() => {
    setProduct(fetchProduct())
  }, [])

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);

    try {
      const response = await axios.post('http://localhost:3500/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre :</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="description">Description :</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <label htmlFor="price">Price :</label>
        <input type="number" id="price" value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <label htmlFor="quantity">Quantity :</label>
        <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div>
        <label htmlFor="file">Fichier :</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Télécharger</button>
    </form>
    </div>
  );
}

export default App;
