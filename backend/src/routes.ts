import { Router } from 'express'
import { CreateItemController } from './controllers/item/CreateItemController'
import { ListItemController } from './controllers/item/ListItemController'
import { UpdateItemController } from './controllers/item/UpdateItemController'
import { RemoveItemController } from './controllers/item/RemoveItemController'

const router = Router()

// router.method("path", new ItemController().method)

// Create, List, Update and Remove Item CRUD

router.post('/item', new CreateItemController().handle)
router.get('/item', new ListItemController().handle)
router.put('/item', new UpdateItemController().handle)
router.delete('/item', new RemoveItemController().handle)

export { router }
