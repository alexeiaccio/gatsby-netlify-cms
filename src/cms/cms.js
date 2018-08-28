import CMS from "netlify-cms";

import ArticlePreview from "./preview-templates/ArticlePreview";

CMS.registerPreviewTemplate("articles", ArticlePreview);

CMS.registerPreviewStyle("/example.css");

CMS.registerEditorComponent({
  id: "youtube",
  label: "Youtube",
  icon: "video",
  fields: [{ name: "id", label: "Youtube Video ID" }],
  pattern: /^{{<\s?youtube (\S+)\s?>}}/,
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  toBlock: function(obj) {
    return "{{< youtube " + obj.id + " >}}";
  },
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' +
      obj.id +
      '/maxresdefault.jpg" alt="Youtube Video"/>'
    );
  }
});
