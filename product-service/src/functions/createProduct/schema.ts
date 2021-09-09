export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'integer' },
    count: { type: 'integer' }
  },
  required: ['title']
} as const;
