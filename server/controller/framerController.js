import mergeImages from "merge-images";
import fs from "fs";
const { Canvas, Image } = require("canvas");

export default class FramerController {
  /**
   * fetch posts
   * @param {req} req express req object
   * @param {res} res express res object
   */
  static async generateFrame(req, res) {
    try {
      const { image } = req.body;
      if (!image) {
        throw new Error();
      }

      fs.readFile(__dirname + "/gold-frame.png", (err, data) => {
        if (err) throw new Error();
        mergeImages([data, image], {
          Canvas: Canvas,
          Image: Image,
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
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        error: error.message,
      });
    }
  }
}
