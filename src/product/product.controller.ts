import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.tdo';
import { GetAllProductDto } from './dto/getAllProducts.dto';
import { RolesAuth } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidationPipe } from 'src/pipes/pipes.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  //   @RolesAuth('ADMIN')
  //   @UseGuards(RolesGuard)
  //   @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @Body() body: ProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.createProduct(body, image);
  }

  @Delete(':id')
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id);
  }

  @Post('/allByName')
  getAllByName(@Body() body: { name: string; isLimit: boolean }) {
    return this.productService.getAllByName(body.name, body.isLimit);
  }

  @Post('/getAll')
  getAll(
    @Body()
    body: GetAllProductDto,
  ) {
    return this.productService.getAll(body);
  }
}
