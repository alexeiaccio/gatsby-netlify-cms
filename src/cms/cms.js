import CMS from "netlify-cms";

import ArticlePreview from "./preview-templates/ArticlePreview";

CMS.registerPreviewTemplate("articles", ArticlePreview);

CMS.registerPreviewStyle("./styles.css");

CMS.registerEditorComponent({
  id: "youtube",
  label: "Youtube",
  icon: "video",
  fields: [{ name: "id", label: "Youtube Video ID" }],
  pattern: /^<.+youtube\.com\/embed\/(\S+)\?.+>$/,
  fromBlock: match => ({
    id: match[1]
  }),
  toBlock: ({ id }) =>
    `<iframe src="https://www.youtube.com/embed/${id}?rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen width="560" height="315" ></iframe>`,
  toPreview: ({ id }) =>
    `<img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="Youtube Video"/>`
});
