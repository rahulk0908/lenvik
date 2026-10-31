import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'sections', title: 'Sections' },
  ],
  fields: [
    defineField({ name: 'companyName', type: 'string', initialValue: 'Lenvik Construction & Fabrication', validation: (r) => r.required() }),
    defineField({ name: 'tagline', type: 'string', group: 'hero', initialValue: 'Your vision, our expertise.', validation: (r) => r.required() }),
    defineField({ name: 'heroEyebrow', title: 'Hero label', type: 'string', group: 'hero', description: 'Small line above the headline' }),
    defineField({ name: 'heroText', title: 'Hero text', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'yearFounded', type: 'string', group: 'hero' }),
    defineField({
      name: 'heroVideo',
      type: 'file',
      group: 'hero',
      options: { accept: 'video/mp4' },
      description: 'Optional. Keep under 5 MB (1080p MP4). Leave empty to use the video bundled with the site.',
    }),
    defineField({ name: 'heroPoster', title: 'Hero image', type: 'image', group: 'hero', description: 'Shown on phones and while the video loads' }),
    defineField({
      name: 'stats',
      type: 'array',
      group: 'hero',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', description: 'e.g. 340+', validation: (r) => r.required() }),
            defineField({ name: 'label', type: 'string', description: 'e.g. Projects delivered', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'phone', type: 'string', group: 'contact', validation: (r) => r.required() }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      group: 'contact',
      description: 'International format, digits only, e.g. 919876543210',
      validation: (r) => r.required().regex(/^\d{10,15}$/, { name: 'digits only' }),
    }),
    defineField({ name: 'email', type: 'string', group: 'contact', validation: (r) => r.required().email() }),
    defineField({ name: 'hours', title: 'Opening hours', type: 'string', group: 'contact' }),
    defineField({ name: 'replyTime', type: 'string', group: 'contact', initialValue: '24 hours' }),
    defineField({
      name: 'interiorOfferings',
      title: 'Interior offerings',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'clientLogos',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'logo', type: 'image' }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
