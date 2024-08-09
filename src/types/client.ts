import { Client } from '@prisma/client'

export type CreateClientData = Omit<Client, 'id'>
export type CreateClientReturn = Omit<CreateClientData, 'userId'>
