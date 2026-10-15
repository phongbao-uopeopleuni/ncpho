/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { BRAND_INFO, Language } from "../constants";
import { useLocation } from "react-router-dom";
import { siteUrl } from "../site";

interface SEOProps {
  title: string;
  titleBrand?: string;
  description: string;
  canonical?: string;
  lang: Language;
  type?: string;
  image?: string;
}

export default function SEO({ title, titleBrand, description, canonical, lang, type = "website", image }: SEOProps) {
  const siteName = BRAND_INFO.name;
  const fullTitle = `${title} | ${titleBrand ?? siteName}`;
  const { pathname } = useLocation();
  const url = canonical || siteUrl(pathname);

  useEffect(() => {
    // React 19 renders the active metadata; retire the initial HTML fallbacks.
    document.querySelectorAll("[data-seo-fallback]").forEach((element) => element.remove());
    if (pathname !== "/menu" && pathname !== "/vi/menu") {
      document.querySelectorAll("[data-menu-schema-fallback]").forEach(element => element.remove());
    }
  }, [pathname]);

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
    </Helmet>
  );
}
