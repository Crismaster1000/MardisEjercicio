import { Router } from "express"; 
import { getObjects, newObject } from "../controller/objeto.controller";

const router = Router()

router.get('/objects', getObjects)

router.post('/objects', newObject)



export default router