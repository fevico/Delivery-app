import { addProduct, allProduct, getProductById, removeProduct, updateProduct } from "#/controller/product";
import { Router } from "express";

const router = Router();

router.post('/add-product', addProduct)
router.patch('/update-product', updateProduct)
router.get('/all-product', allProduct)
router.get('/:productId', getProductById)
router.delete('/:productId', removeProduct)

export default router;