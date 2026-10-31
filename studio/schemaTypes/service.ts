import { defineArrayMember, defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', description: 'Lower numbers show first' }),
    defineField({ name: 'image', title: 'Backdrop image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'text', rows: 2, validation: (r) => r.required().max(160) }),
    defineField({
      name: 'points',
      title: 'Key points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.max(3),
    }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', media: 'image' } },
})
