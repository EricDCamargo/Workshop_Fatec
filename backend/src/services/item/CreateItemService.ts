import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../errors/AppError'
import prismaClient from '../../prisma'
import { AppResponse } from '../../@types/app.types'

interface IItemRequest {
  name: string
}

class CreateItemService {
  async execute({ name }: IItemRequest): Promise<AppResponse> {
    if (!name) {
      throw new AppError('Atenção, nome é requerido', StatusCodes.BAD_REQUEST)
    }

    const item = await prismaClient.item.create({
      data: {
        name: name
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return { data: item, message: 'Item criado com sucesso' }
  }
}

export { CreateItemService }
