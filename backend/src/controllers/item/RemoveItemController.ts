import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { RemoveItemService } from '../../services/item/RemoveItemService'
import { AppError } from '../../errors/AppError'

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const id = req.query.item_id as string
    const removeItemService = new RemoveItemService()

    try {
      const result = await removeItemService.execute({ id })

      return res.status(StatusCodes.OK).json(result)
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

export { RemoveItemController }
