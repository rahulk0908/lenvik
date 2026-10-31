import { defineArrayMember, defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Houses', 'Interiors', 'Steel & PEB', 'Roofing', 'Piping'], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['Completed', 'Ongoing'], layout: 'radio' },
      initialValue: 'Completed',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'featured', type: 'boolean', description: 'Show on the home page', initialValue: false }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'year', type: 'string' }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'area', type: 'string', description: 'e.g. 3,200 sq ft or 45 tonnes' }),
    defineField({ name: 'startDate', type: 'string', description: 'e.g. March 2025' }),
    defineField({ name: 'handover', type: 'string', description: 'Handover or completion month' }),
    defineField({
      name: 'progress',
      title: 'Progress (%)',
      type: 'number',
      hidden: ({ document }) => document?.status !== 'Ongoing',
      validation: (r) => r.min(0).max(100),
    }),
    defineField({ name: 'summary', type: 'text', rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: 'body', title: 'Details', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })] }),
    defineField({
      name: 'services',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          'Civil construction',
          'Interior design & execution',
          'Structural steel',
          'PEB structures',
          'Roofing works',
          'Mechanical piping',
        ],
      },
    }),
    defineField({ name: 'gallery', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true } })] }),
    defineField({
      name: 'milestones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'note', type: 'string' }),
            defineField({ name: 'date', type: 'string' }),
            defineField({ name: 'done', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'title', subtitle: 'date' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
})
