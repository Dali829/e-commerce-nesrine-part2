import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

// API endpoint for categories
// ... (import statements)

const categoriesEndpoint = 'http://localhost:8800/api/categorie';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch(categoriesEndpoint);
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const addCategory = async () => {
    try {
      const response = await fetch(categoriesEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newCategory }),
      });
      if (response.ok) {
        fetchCategories(); // Refresh categories after adding a new one
        setNewCategory('');
        handleCloseDialog();
      } else {
        // Handle error response, e.g., display an error message to the user
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // ... (rest of the code remains unchanged)

// ... (rest of the code remains unchanged)

  const deleteCategory = async (categoryId) => {
    try {
      await fetch(`${categoriesEndpoint}/${categoryId}`, {
        method: 'DELETE',
      });
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories on component mount

  return (       
    <>
      <Button variant="outlined" startIcon={<Add />} onClick={handleClickOpenDialog}>
        Ajouter Categorie
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une nouvelle</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={addCategory} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <ListItemText primary={category.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => deleteCategory(category._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const RecentTransactions = () => {
  return (
    <DashboardCard title="Gestion des catégories">
      <CategoryManagement />
      {/* Add your timeline component here */}
    </DashboardCard>
  );
};

export default RecentTransactions;
