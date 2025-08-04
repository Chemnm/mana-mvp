import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { inventoryData } from '../../data/retailData';

const getExpirationColor = (dateString) => {
  if (!dateString) return 'default';
  const expirationDate = new Date(dateString);
  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  if (expirationDate < today) {
    return 'error';
  }
  if (expirationDate < sevenDaysFromNow) {
    return 'warning';
  }
  return 'default';
};

const ProductSidebar = ({ detectedProducts }) => {
  const groupedProducts = detectedProducts.reduce((acc, product) => {
    acc[product.product] = acc[product.product] || { ...product, quantity: 0 };
    acc[product.product].quantity += 1;
    return acc;
  }, {});

  const getExpirationDate = (productName) => {
    const item = inventoryData.find(item => item.className === productName);
    return item ? item.expirationDate : 'N/A';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detected Products
        </Typography>
        <List>
          {Object.values(groupedProducts).map((product) => (
            <ListItem key={product.product}>
              <ListItemText
                primary={product.product.replace(/_/g, ' ')}
                secondary={`Confidence: ${product.confidence.toFixed(2)}`}
              />
              <Chip label={`Qty: ${product.quantity}`} sx={{ mr: 1 }} />
              <Chip
                label={`Expires: ${getExpirationDate(product.product)}`}
                color={getExpirationColor(getExpirationDate(product.product))}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProductSidebar;
