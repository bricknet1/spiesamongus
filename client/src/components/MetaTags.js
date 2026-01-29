import { Helmet } from "react-helmet-async";

/**
 * MetaTags component for dynamically setting page meta tags
 * 
 * Usage:
 * <MetaTags
 *   title="Page Title"
 *   description="Page description"
 *   ogTitle="Open Graph Title"
 *   ogDescription="Open Graph Description"
 *   ogImage="https://example.com/image.jpg"
 *   ogUrl="https://example.com/page"
 *   twitterCard="summary_large_image"
 * />
 */
function MetaTags({
  title = "Spies Among Us",
  description = "Spies Among Us",
  ogTitle,
  ogDescription,
  ogImage = "https://app.spiesamong.us/General.jpg",
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
}) {
  // Use provided values or fall back to defaults
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;
  
  // Get current URL if ogUrl is not provided
  const finalOgUrl = ogUrl || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
    </Helmet>
  );
}

export default MetaTags;

