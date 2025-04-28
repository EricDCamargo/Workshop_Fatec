import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ListItemService } from '../../services/item/ListItemService'
import { AppError } from '../../errors/AppError'

class ListItemController {
  async handle(req: Request, res: Response) {
    const listItemService = new ListItemService()

    try {
      const items = await listItemService.execute()

      return res.status(StatusCodes.OK).json(items)
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

export { ListItemController }
