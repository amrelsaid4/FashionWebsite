import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Rating,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchProducts = async (category) => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://fakestoreapi.com/products";
      if (category !== "all") {
        url += `/category/${category === "men" ? "men's clothing" : "women's clothing"}`;
      }
      
      const { data } = await axios.get(url);
      setProducts(data.map(product => ({
        ...product,
        originalPrice: (product.price * (1 + Math.random() * 0.5)).toFixed(2),
        discount: product.price > 50 ? Math.floor(Math.random() * 30) + 10 : 0
      })));
    } catch (error) {
      setError("Failed to load products. Please try again later.");
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts(category); 
  }, [category]);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold">Selected Products</h2>
          <p className="text-gray-600">All our new arrivals in an exclusive brand selection</p>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {["all", "men", "women"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                category === cat 
                  ? "bg-red-500 text-white" 
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat === "all" ? "All Products" : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center my-8">
          <CircularProgress color="error" />
        </div>
      )}

      {error && (
        <Alert severity="error" className="my-4">
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
          >
            <Card 
              className="h-full flex flex-col rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
            >
              {product.discount > 0 && (
                <motion.span 
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  -{product.discount}%
                </motion.span>
              )}

              <div 
                onClick={() => handleImageClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <CardMedia
                  className="h-48 p-4 bg-white object-contain"
                  image={product.image}
                  title={product.title}
                  component="img"
                />
              </div>

              <CardContent className="flex-grow p-4">
                <h3 
                  className="font-semibold text-lg mb-2 line-clamp-2 h-14 cursor-pointer"
                  onClick={() => handleImageClick(product)}
                >
                  {product.title}
                </h3>
                
                <Rating 
                  value={product.rating?.rate || 4.5} 
                  precision={0.5}
                  size="small"
                  readOnly
                  className="mb-2"
                />

                <div className="flex items-center gap-2">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-red-500 font-bold text-lg">
                        ${product.price}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-lg">${product.price}</span>
                  )}
                </div>
              </CardContent>

              <CardActions className="p-4 pt-0">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    size="medium"
                    startIcon={<AddShoppingCartOutlinedIcon />}
                    onClick={() => handleAddToCart(product)}
                    className="normal-case"
                  >
                    Add to cart
                  </Button>
                </motion.div>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Product Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: "min-w-full md:min-w-[800px] p-4" }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 hover:text-red-500 hover:rotate-180 transition-all"
        >
          <Close />
        </IconButton>

        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-6 p-4">
            <motion.div 
              className="flex justify-center bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title}
                className="h-64 object-contain"
              />
            </motion.div>

            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-2">{selectedProduct.title}</h3>
              
              <Rating 
                value={selectedProduct.rating?.rate || 4.5} 
                precision={0.5}
                readOnly
                className="mb-4"
              />

              <div className="flex items-center gap-4 mb-4">
                {selectedProduct.discount > 0 ? (
                  <>
                    <span className="text-red-500 font-bold text-2xl">
                      ${selectedProduct.price}
                    </span>
                    <span className="text-gray-400 line-through">
                      ${selectedProduct.originalPrice}
                    </span>
                    <span className="text-red-500 text-sm">
                      Save {selectedProduct.discount}%
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-2xl">${selectedProduct.price}</span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<AddShoppingCartOutlinedIcon />}
                  className="normal-case px-6 py-2"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setOpen(false);
                  }}
                >
                  Buy Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {selectedProduct?.title} added to cart!
          </Alert>
        </motion.div>
      </Snackbar>
    </div>
  );
};

export default Main;