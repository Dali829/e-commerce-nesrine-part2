import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import axios from 'axios';

const Blog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Remplacez l'URL par l'endpoint de votre API
    const apiUrl = 'http://localhost:4000/api/products';

    axios.get(apiUrl)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des produits', error);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item sm={12} md={4} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} to="/">
              <img src={product.photo} alt={product.title} width="100%" height="100%" />
            </Typography>
            <Tooltip title="Add To Cart">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
              >
                <IconBasket size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6">${product.price}</Typography>
                  <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                    ${product.salesPrice}
                  </Typography>
                </Stack>
                <Rating name="read-only" size="small" value={product.rating} readOnly />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blog;
