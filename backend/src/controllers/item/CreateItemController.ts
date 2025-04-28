import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateItemService } from '../../services/item/CreateItemService'
import { AppError } from '../../errors/AppError'

class CreateItemController {
  async handle(req: Request, res: Response) {
    const { name } = req.body
    const createItemService = new CreateItemService()

    try {
      const item = await createItemService.execute({ name })

      return res.status(StatusCodes.CREATED).json(item)
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
export { CreateItemController }
