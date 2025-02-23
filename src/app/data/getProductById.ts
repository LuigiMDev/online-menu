import { db } from "@/lib/prisma"

export const getProductById = async (id: string) => {
    return await db.product.findUnique({where: {id: id}, include: {
        restaurant: {
            select: {
                name: true,
                slug: true,
                avatarImageUrl: true
            }
        }
    }})
}