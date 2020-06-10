import UserModel, { IUserModel } from '../../models/UserModel';
import { IProduct } from '../../interfaces/IProduct'

export default class Video implements IProduct {

  public createProduct = (email, product) => new Promise<any>((resolve, reject) => {

    UserModel.findOneAndUpdate({ email: email }, { $push: { videos: product } })
      .then((user) => {
        resolve({ idVideo: product.idVideo });
      })
      .catch((error: Error) => console.log(error));
  });
}