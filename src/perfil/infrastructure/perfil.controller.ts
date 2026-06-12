import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Perfis } from 'src/common/decorators/perfil.decorator';
import { AssignPerfilUseCase } from '../application/assign-perfil.usecase';
import { CreatePerfilUseCase } from '../application/create-perfil.usecase';
import { ListaPerfisUseCase } from '../application/lista-perfis.usecase';
import { RemovePerfilUseCase } from '../application/remove-perfil.usecase';
import { Perfil } from '../domain/perfil.enum';
import { CreatePerfilDto } from '../application/dto/create-perfil.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PerfisGuard } from 'src/common/guards/perfis.guards';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignPerfilDto } from '../application/dto/assign-perfil.dto';

@ApiBearerAuth()
@ApiTags('GBM')
@UseGuards(JwtAuthGuard, PerfisGuard)
@Controller('perfil')
export class PerfilController {
  constructor(
    private readonly listaPerfis: ListaPerfisUseCase,
    private readonly criaPerfil: CreatePerfilUseCase,
    private readonly assignPerfil: AssignPerfilUseCase,
    private readonly removePerfil: RemovePerfilUseCase,
  ) {}

  @Perfis(Perfil.ADMIN)
  @Get()
  listarPerfis() {
    return this.listaPerfis.execute();
  }

  @Perfis(Perfil.ADMIN)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  criarPerfil(@Body() body: CreatePerfilDto) {
    return this.criaPerfil.execute(body);
  }

  @Perfis(Perfil.ADMIN)
  @Post('/assign')
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully assigned.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  assignPerfilUsuario(@Body() body: AssignPerfilDto) {
    const { codUsuario, nomPerfil } = body;

    return this.assignPerfil.execute(codUsuario, nomPerfil);
  }

  @Perfis(Perfil.ADMIN)
  @Delete(':codUsuario/remove/:codPerfil')
  removePerfilUsuario(
    @Param('codUsuario') codUsuario: string,
    @Param('codPerfil') codPerfil: number,
  ) {
    return this.removePerfil.execute(codUsuario, codPerfil);
  }
}
