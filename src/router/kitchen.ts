import { createKitchen, getAllKitchens, getKitchenById, updateKitchen } from "#/controller/kitchen";
import { Router } from "express";

const router = Router();

router.post('/create-kitchen', createKitchen)
router.patch('/update-kitchen', updateKitchen)
router.get('/all-kitchen', getAllKitchens)
router.get('/:kichenId', getKitchenById)

export default router;