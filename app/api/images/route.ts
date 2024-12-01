import cloudinary from "cloudinary";

type CloudinaryResource = {
  height: number;
  width: number;
  public_id: string;
  format: string;
};

export async function GET() {
  try {
    console.log('Cloudinary Config:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        folder: process.env.CLOUDINARY_FOLDER
      });
    // Configure cloudinary
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    const searchExpression = `folder:${process.env.CLOUDINARY_FOLDER}`;
    console.log('Search Expression:', searchExpression);

    const results = await cloudinary.v2.search
      .expression(searchExpression)  // Remove the /* from the folder path
      .sort_by("created_at", "desc")
      .max_results(400)
      .execute();

      console.log('Found resources:', results.resources.length);

    const reducedResults = results.resources.map((result: CloudinaryResource, index: number) => ({
      id: index,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    }));

    return Response.json(reducedResults);
  } catch (error) {
    console.error('Error in /api/images:', error);
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
