import { createCategory, deleteCategory, getAllcategory, getCategoryById, updateCategory } from "#/controller/category";
import { Router } from "express";

const router = Router();

router.post('/create', createCategory)
router.patch('/:catId', updateCategory)
router.delete('/delete-category', deleteCategory)
router.get('/all-category', getAllcategory)
router.get('/get-categoryById', getCategoryById)

export default router;