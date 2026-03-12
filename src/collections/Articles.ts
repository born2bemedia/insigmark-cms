import type { CollectionConfig } from "payload";
import slugify from "slugify";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Article Title",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      hooks: {
        beforeChange: [
          async ({ data }) => {
            if (data?.title) {
              return slugify(data.title, { lower: true, strict: true });
            }
          },
        ],
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "text",
      label: "Excerpt",
      localized: true,
    },
    {
      name: "read_time",
      type: "text",
      label: "Read Time",
      required: false,
      localized: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Web Development", value: "web-development" },
        { label: "Hosting", value: "hosting" },
        { label: "Maintenance", value: "maintenance" },
        { label: "Industry Insights", value: "industry-insights" },
        { label: "Security", value: "security" },
        { label: "Optimization", value: "optimization" },
      ],
      required: false,
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      localized: true,
    },
    {
      name: "seo_title",
      type: "text",
      label: "SEO Title",
      required: false,
      localized: true,
    },
    {
      name: "seo_description",
      type: "text",
      label: "SEO Description",
      required: false,
      localized: true,
    },
  ],
  hooks: {
    /*afterChange: [
      async ({ doc }) => {
        try {
          const response = await fetch('https://modulixo.com/api/revalidate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tags: ['articles'],
            }),
          })

          if (!response.ok) {
            console.error('Cache revalidation failed:', response.statusText)
          } else {
            console.log('Cache revalidation triggered successfully.')
          }
        } catch (error) {
          console.error('Error triggering cache revalidation:', error)
        }
      },
    ],*/
  },
};
