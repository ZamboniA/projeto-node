import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductRepository';
import Product from '../entities/Product';


class ListProductService{
  public async execute(): Promise<Product[]> {
    const productsRepository =  getCustomRepository(ProductRepository);

    const product = await productsRepository.find()

    return product;
  }
}


export default ListProductService;



