import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatsResponse } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(userId: string, data: { name?: string; email?: string }) {
    // Check if email already exists (if updating email)
    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new Error('Este email já está sendo usado por outro usuário');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async deleteUser(userId: string) {
    // First check if user exists
    await this.findById(userId);

    // Delete user (refresh tokens will be deleted due to CASCADE)
    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Usuário deletado com sucesso' };
  }

  async getUserStats(): Promise<UserStatsResponse> {
    const totalUsers = await this.prisma.user.count();
  
    const usersByRoleRaw = await this.prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true,
      },
    });
  
    const usersByRole = usersByRoleRaw.map((item) => ({
      role: item.role,
      count: item._count.role,
    }));
  
    const activeTokens = await this.prisma.refreshToken.count({
      where: {
        revoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  
    return {
      totalUsers,
      usersByRole,
      activeTokens,
    };
  }
  
}