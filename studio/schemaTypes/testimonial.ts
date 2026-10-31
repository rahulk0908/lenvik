import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', description: 'e.g. Homeowner, or Plant manager, ABC Ltd' }),
    defineField({ name: 'quote', type: 'text', rows: 4, validation: (r) => r.required().max(320) }),
    defineField({ name: 'service', type: 'string' }),
    defineField({ name: 'project', type: 'reference', to: [{ type: 'project' }] }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'quote' } },
})
