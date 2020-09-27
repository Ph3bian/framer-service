import mergeImages from "merge-images";
import fs from "fs";
import { Canvas, Image, createCanvas } from "canvas";

export default class FramerController {
  /**
   * fetch posts
   * @param {req} req express req object
   * @param {res} res express res object
   */
  static async generateFrame(req, res) {
    try {
      const { image } = req.body;
      if (!image) throw new Error();
      const CanvasImage = Image;
      const canvas = createCanvas(700, 500);
      const ctx = canvas.getContext("2d");

      const img = new CanvasImage();

      img.onload = function () {
        ctx.drawImage(img, 53, 90, 600, 450);
        var imageData = canvas.toDataURL();
        fs.readFile("assets/images/gold-frame.png", async (err, data) => {
          if (err) throw new Error();
          mergeImages([data, imageData], {
            Canvas,
            Image,
          })
            .then((response) =>
              res.status(200).json({
                data: response,
                status: 200,
                success: true,
              })
            )
            .catch(() => {
              throw new Error();
            });
        });
      };

      img.onerror = (err) => {
        throw err;
      };

      img.src = image;
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        error: error.message,
      });
    }
  }
}
