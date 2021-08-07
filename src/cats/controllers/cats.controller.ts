import { Cat } from '../cats.schema';
import { multerOptions } from '../../common/utils/multer.options';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { AuthService } from '../../auth/auth.service';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CatRequestDto } from '../dto/cats.request.dto';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { CatsService } from '../cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}
  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 201,
    description: '가입 성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@Body() body: LoginRequestDto) {
    return await this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '사진 업로드' })
  @UseInterceptors(FilesInterceptor('image', 4, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    return this.catsService.uploadImg(cat, files);
  }
}
