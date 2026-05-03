/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Helmet } from "react-helmet-async";
import { Language } from "../constants";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  lang: Language;
  type?: string;
  image?: string;
}

export default function SEO({ title, description, canonical, lang, type = "website", image }: SEOProps) {
  const siteName = "North Carolina Phở";
  const fullTitle = `${title} | ${siteName}`;
  const url = canonical || "https://ncpho.com";

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Robots control */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
    </Helmet>
  );
}
