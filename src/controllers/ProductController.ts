import * as express from 'express';
import ProductFactory from '../factories/product/ProductFactory'

class ProductController {
  public create(req: express.Request, res: express.Response, next: express.NextFunction): void {

    const { purchase, type } = req.body;
    
    ProductFactory.getProduct(type)
      .then((factProduct) => {
        factProduct.createProduct(purchase.email, purchase.product)
          .then((product) => {
            res.status(200).json({ code: 200, message: 'Se ha comprado el producto', product: product })
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));
  }
}

export default new ProductController();