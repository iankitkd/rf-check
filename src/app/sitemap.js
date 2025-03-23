export default async function sitemap() {
    const baseUrl = process.env.BASE_URL;
  
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date().toISOString(),
      },
    ];
  }
  