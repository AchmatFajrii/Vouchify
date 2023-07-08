const cloudinary = require('cloudinary').v2;

interface IUploadImage {
  status: string,
  url: string,
  publicId: string,
  message: string
}

export enum FolderLocation {
  Game = "Game",
  GameCategory = "GameCategory",
  Transaction = "Transaction",
  Banner = "Banner",
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export function uploadImageProvider(file: any, folderLocation: FolderLocation): Promise<IUploadImage> {
  let folder: string;
  let width: number, height: number;

  switch (folderLocation) {
    case FolderLocation.Game:
      folder = "vochify/assets/images/games/";
      width = 512;
      height = 512;
      break;
    case FolderLocation.GameCategory:
      folder = "vochify/assets/images/game-categories/";
      width = 250;
      height = 250;
      break;
    case FolderLocation.Banner:
      folder = "vochify/assets/images/banners/";
      width = 1024;
      height = 1024;
      break;

    default:
      folder = "vochify/assets/images/transactions/";
      width = 250;
      height = 250;
      break;
  }

  return new Promise((resolve) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'auto',
      width: width,
      height: height,
      crop: "fit",
      folder: folder,
    }, function (error: any, result: any) {
      if (!error && result.url) {
        resolve({ status: 'success', url: result.url, publicId: result.public_id, message: "" });
      } else {
        resolve({ status: 'failed', url: "", publicId: "", message: "Failed : " + error.message });
      }
    }).end(file);
  });
}

export const removeImageProvider = (cloudinaryPublicId: any) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(cloudinaryPublicId, function (error: any, result: any) {
      if (!error) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  });
}