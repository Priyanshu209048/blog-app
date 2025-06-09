import React from 'react';
import DOMPurify from 'dompurify';

export const HtmlToText50 = ({ htmlContent }) => {

  const plainText = new DOMParser().parseFromString(htmlContent, "text/html").body.textContent || "";

  // Limit text to first 20 characters
  const truncatedText = plainText.substring(0, 50);

  return <span>{truncatedText}</span>; // Render as plain text
};

export const HtmlToText = ({ htmlContent }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
}