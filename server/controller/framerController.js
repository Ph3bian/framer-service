const mediumUrl = "https://medium.com/feed";

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
      return res.status(200).json({
        data,
        status: 200,
        success: true,
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
