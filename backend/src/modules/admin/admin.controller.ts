import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminRolesGuard } from '../auth/auth.guard';

@Controller('admin')
@UseGuards(AdminRolesGuard)
@ApiBearerAuth()
export class AdminController {
    @Get('some-protected-route')
    getProtectedRoute() {
        return 'This is a protected admin route';
    }
}
