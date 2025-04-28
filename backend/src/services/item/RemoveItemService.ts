import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../errors/AppError'
import prismaClient from '../../prisma'
import { AppResponse } from '../../@types/app.types'

interface IRemoveItemRequest {
  id: string
}

class RemoveItemService {
  async execute({ id }: IRemoveItemRequest): Promise<AppResponse> {
    if (!id) {
      throw new AppError('Atenção, ID é requerido', StatusCodes.BAD_REQUEST)
    }

    const item = await prismaClient.item.findUnique({
      where: { id }
    })

    if (!item) {
      throw new AppError('Item não encontrado', StatusCodes.NOT_FOUND)
    }

    await prismaClient.item.delete({
      where: { id }
    })

    return { message: 'Item removido com sucesso' }
  }
}

export { RemoveItemService }
