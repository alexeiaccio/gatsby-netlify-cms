import CMS from "netlify-cms";

import ArticlePreview from "./preview-templates/ArticlePreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("articles", ArticlePreview);
