import { Request, Response, response } from "express";
import ListProductService from "../typeorm/services/ListProductService";
import ShowProductService from "../typeorm/services/ShowProductService";
import CreateProductService from "../typeorm/services/CreateProductService";
import UpdateProductService from "../typeorm/services/UpdateProductService";
import DeleteProductService from "../typeorm/services/DeleteProductService";

export default class ProductsController{
  public async index (req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }


  public async show (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create (req: Request, res: Response): Promise<Response>{
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity
    })

    return res.json(product);
  }

  public async update (req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const updtateProduct = new UpdateProductService();

    const product = await updtateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return res.json(product)
  }

  public async delete (req: Request, res: Response): Promise<Response>{
    const { id } = req.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return res.json([]);
  }

}