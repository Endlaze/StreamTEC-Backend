import UserModel, { IUserModel } from '../../models/UserModel';
import { IProduct } from '../../interfaces/IProduct'

export default class Music implements IProduct {

  public createProduct = (email, product) => new Promise<any>((resolve, reject) => {

    UserModel.findOne({ email: email })
      .then((user) => {
        user.albums = addTrackToAlbum(product.idAlbum, product.track, user.albums);
        user.save();
        resolve({ track: product.track, updatedAlbums: user.albums });
      })
      .catch((error: Error) => console.log(error));
  });
}

const addTrackToAlbum = (idAlbum, track, albums) => {

  if (!albumExists(idAlbum, albums)) {
    albums.push({ idAlbum: idAlbum, tracks: [track] })
    return albums
  }

  for (let index = 0; index < albums.length; index++) {
    if (albums[index].idAlbum === idAlbum) {
      albums[index].tracks.push(track)
      return albums
    }
  }

}

const albumExists = (idAlbum, ownedAlbums) => {
  let ownedAlbum = ownedAlbums.find((album) => {
    return (album.idAlbum === idAlbum)
  })

  return (ownedAlbum !== undefined);
}