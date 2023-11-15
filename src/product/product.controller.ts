import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto';


@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  createProduct(@Body() dto:ProductDto) {
    return this.productService.createProduct(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  deleteProduct(@Param("id") id: string) {
    return this.productService.deleteProduct(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(":id")
  updateProduct(@Body() dto: ProductDto, @Param("id") id: string) {
    return this.productService.updateProduct(dto, id);
  }


  @HttpCode(HttpStatus.OK)
  @Get("all")
  getAllProduct() {
    return this.productService.getAllProduct();
  }

}
