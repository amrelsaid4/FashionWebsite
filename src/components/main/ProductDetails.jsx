import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography, Rating, Divider } from "@mui/material";

const ProductDetails = ({ product }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        p: 4,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        p: 2,
        borderRadius: 2,
        flex: 1
      }}>
        <img 
          width={300} 
          src={product.image} 
          alt={product.title}
          style={{ objectFit: "contain", height: 300 }}
        />
      </Box>

      <Box sx={{ textAlign: { xs: "center", sm: "left" }, flex: 1 }}>
        <Typography variant="h5" gutterBottom>{product.title}</Typography>
        
        <Rating 
          value={product.rating?.rate || 4.5} 
          precision={0.5} 
          readOnly 
          sx={{ mb: 1 }}
        />
        
        <Divider sx={{ my: 2 }} />
        
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Typography fontSize={"22px"} color={"error"} variant="h6">
            ${product.price}
          </Typography>
          {product.originalPrice && (
            <Typography variant="body1" color="text.secondary" sx={{ textDecoration: "line-through" }}>
              ${product.originalPrice}
            </Typography>
          )}
          {product.discount > 0 && (
            <Typography variant="body2" color="error">
              Save {product.discount}%
            </Typography>
          )}
        </Stack>
        
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>

        <Button 
          sx={{ 
            mb: { xs: 1, sm: 0 }, 
            textTransform: "capitalize",
            px: 4,
            py: 1.5
          }} 
          variant="contained" 
          color="error"
        >
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;