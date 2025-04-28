import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UpdateItemService } from '../../services/item/UpdateItemService'
import { AppError } from '../../errors/AppError'

class UpdateItemController {
  async handle(req: Request, res: Response) {
    const id = req.query.item_id as string
    const { name } = req.body

    const updateItemService = new UpdateItemService()

    try {
      const updatedItem = await updateItemService.execute({ id, name })

      return res.status(StatusCodes.OK).json(updatedItem)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message })
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  }
}

export { UpdateItemController }
