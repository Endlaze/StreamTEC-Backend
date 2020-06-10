import ProductController from '../controllers/ProductController'
import { Router } from 'express'

export default class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes = () => {
    this.router.post('/create', ProductController.create);
  }
}