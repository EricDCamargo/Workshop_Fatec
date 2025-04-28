import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../errors/AppError'
import prismaClient from '../../prisma'
import { AppResponse } from '../../@types/app.types'

interface IUpdateItemRequest {
  id: string
  name: string
}

class UpdateItemService {
  async execute({ id, name }: IUpdateItemRequest): Promise<AppResponse> {
    if (!id) {
      throw new AppError('Atenção, ID é requerido', StatusCodes.BAD_REQUEST)
    }

    if (!name) {
      throw new AppError('Atenção, nome é requerido', StatusCodes.BAD_REQUEST)
    }

    const existingItem = await prismaClient.item.findUnique({
      where: { id }
    })

    if (!existingItem) {
      throw new AppError('Item não encontrado', StatusCodes.NOT_FOUND)
    }

    const updatedItem = await prismaClient.item.update({
      where: { id },
      data: { name },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return { data: updatedItem, message: 'Item atualizado com sucesso' }
  }
}

export { UpdateItemService }
