export default {
  name: 'Magazine listings',
  renderers: [
    {
      name: 'MagazineArticles',
      doc: 'Renders `cn:articles` with `:layout: cards` as a magazine-style "Latest" block.',
      source: '../renderers/magazine-articles.tsx',
    },
  ],
};
