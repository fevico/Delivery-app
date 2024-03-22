import { approveKitchen, createKitchen, getAllKitchens, getKitchenById, kitchenSignIn, updateKitchen } from "#/controller/kitchen";
import { Router } from "express";

const router = Router();

router.post('/create-kitchen', createKitchen)
router.patch('/update-kitchen', updateKitchen)
router.get('/all-kitchen', getAllKitchens)
router.get('/:kichenId', getKitchenById)
router.post('/kitchen-sigin', kitchenSignIn)
router.post("/approve-kitchen", approveKitchen)

export default router;