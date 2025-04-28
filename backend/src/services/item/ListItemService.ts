import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../errors/AppError'
import prismaClient from '../../prisma'
import { AppResponse } from '../../@types/app.types'

class ListItemService {
  async execute(): Promise<AppResponse> {
    const items = await prismaClient.item.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    if (!items) {
      throw new AppError('Nenhum item encontrado', StatusCodes.NOT_FOUND)
    }

    return { data: items, message: 'Items listados com sucesso' }
  }
}

export { ListItemService }
