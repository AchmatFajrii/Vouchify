import { Request, Response } from "express";
import { BannerService } from "./banner.service";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { validate } from "class-validator";
import { toObject } from "../utils/provider/convert.provider";
import { FolderLocation, removeImageProvider, uploadImageProvider } from "../utils/provider/image-upload.provider";
import { FindAllBannerDto } from "./dto/find-all-banner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";

const bannerService = new BannerService();

class BannerController {
    async create(req: Request, res: Response) {
        let message;
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ 
              "meta": {
                "message": "Please insert image of game category"
              }
             });
        }

        const file = "data:image/png;base64," + image;
        const data = new CreateBannerDto();
        const { name } = req.body;

        data.name = name;
        
        // Upload image to cloudinary
        await uploadImageProvider(file, FolderLocation.Banner).then(value => {
            console.log(value);
            if (value.status == 'success') {
            data.cloudinaryPublicId = value.publicId;
            data.image = value.url;
    
            message = 'Success created a new game';
            } else {
            message = 'Failed while upload image';
            }
        });

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({ errors });;
        }

        const createBanner = await bannerService.create(data);
      
        message = 'Success create a new banner';

        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": toObject(createBanner) ?? null
        });
    }

    async findAll(req: Request, res: Response) {
        const { skip, take } = req.query;
    
        const data = new FindAllBannerDto();
    
        // Pagination
        data.skip = parseInt(skip as string);
        data.take = parseInt(take as string);
    
        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
          return res.status(400).json({
            "meta": {
              "message": "Failed fetch banner"
            },
            "data": errors
          });;
        }
    
        const banners = await bannerService.findAll(data);
    
        return res.status(200).json({
          "meta": {
            "message": "Success fetch banner",
            "links": {
              "skip": skip,
              "take": take,
            },
          },
          "data": toObject(banners) ?? null,
        });
      }

    async activeBanners(req: Request, res: Response) {
        const banners = await bannerService.findActiveBanner();
    
        return res.status(200).json({
          "meta": {
            "message": "Success fetch banner",
          },
          "data": toObject(banners) ?? null,
        });
      }
    
      async findOne(req: Request, res: Response) {
        const { id } = req.params;
        const banner = await bannerService.findOne(id);
    
        return res.status(200).json({
          "meta": {
            "message": "Success get banner"
          },
          "data": toObject(banner) ?? null
        });
      }
    
      async update(req: Request, res: Response) {
        const { id } = req.params;
        let banner, message;
        
        const data = new UpdateBannerDto();
        const { name, isActive, image } = req.body;

        data.name = name;
        data.isActive = isActive;

        if (image != null) {
            const file = "data:image/png;base64," + image;
            const currentBanner = await bannerService.findOne(id);
            
            await uploadImageProvider(file, FolderLocation.Banner).then(value => {
                if (value.status == 'success') {
                    data.cloudinaryPublicId = value.publicId;
                    data.image = value.url;
        
                    message = 'Success updated a game';
                } else {
                    message = 'Please insert an image';
                }
            });
            
            const errors = await validate(data);
            if (errors.length > 0) {
                return res.status(400).json({
                    "meta": {
                    "message": "Failed update game"
                    },
                    "game": errors
                });
            }

            banner = await bannerService.update(id, data);

            if (banner) {
                removeImageProvider(currentBanner?.cloudinaryPublicId);
            }
        } else {
            const errors = await validate(data);
            if (errors.length > 0) {
              return res.status(400).json({
                "meta": {
                  "message": "Failed update game"
                },
                "game": errors
              });
            }
            
            banner = await bannerService.update(id, data);
        }
    
        return res.status(200).json({
            "meta": {
              "message": message
            },
            "data": banner != undefined
              ? toObject(banner)
              : null
          });
      }
      
  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const banner = await bannerService.findOne(id);

    if (banner?.cloudinaryPublicId != null) {
      removeImageProvider(banner?.cloudinaryPublicId);
    }

    bannerService.remove(id);

    return res.status(200).json({
      "meta": {
        "message": "Success delete a banner"
      },
      "data": toObject(banner) ?? null
    });
  }
}

export default new BannerController();