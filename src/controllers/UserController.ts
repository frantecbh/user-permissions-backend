import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";
import { hash } from 'bcrypt'


export class UserController {

    async create(request: Request, response: Response) {

        const { name, username, password } = request.body

        const userExists = await prisma.user.findFirst({

            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
            }

        })

        if (userExists) {
            return response.status(400).json({ message: "Usuário ja existe!" })
        }

        //Criptografar a senha
        const hashPassword = await hash(password, 10)

        const user = await prisma.user.create({

            data: {
                name,
                username,
                password: hashPassword
            },

        })

        const data = {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                created_at: user.created_at
            }

        }

        return response.status(200).json({ data })

    }
}