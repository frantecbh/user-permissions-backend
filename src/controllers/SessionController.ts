import { compare } from 'bcrypt';
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { prisma } from '../database/prismaClient';




export class SessionController {

    async create(request: Request, response: Response) {

        const { username, password } = request.body;



        const result = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
            }
        })

        if (!result) {
            return response.status(400).json({ message: "Usuário não existe!" })
        }

        const matchPassword = await compare(password, result.password)

        if (!matchPassword) {
            return response.status(400).json({ message: "Usuário ou senha incorretos!" })
        }

        const user = {
            id: result.id,
            name: result.name,
            username: result.username,
            created_at: result.created_at
        }


        const token = sign({}, String(process.env.TOKEN_JWT), {

            subject: user.id,
            expiresIn: '1d'
        })

        return response.json({
            token,
            user
        })





    }

}

