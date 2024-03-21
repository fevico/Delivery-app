import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "#/controller/category";
import { Router } from "express";

const router = Router();

router.post('/create', createCategory)
router.patch('/:catId', updateCategory)
router.delete('/delete-category', deleteCategory)
router.get('/all-category', getAllCategories)
router.get('/:catId', getCategoryById)

export default router;