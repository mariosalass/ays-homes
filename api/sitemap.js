const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  const sb = createClient(
    process.env.SB_URL,
    process.env.SB_KEY
  );

  const { data } = await sb
    .from('listings')
    .select('id, updated_at')
    .eq('kind', 'property');

  var urls = (data || []).map(function(item){
    return '<url>'
      + '<loc>https://ays.homes/ficha.html?id=' + item.id + '&amp;mode=client</loc>'
      + '<lastmod>' + (item.updated_at || new Date().toISOString()).slice(0, 10) + '</lastmod>'
      + '<changefreq>weekly</changefreq>'
      + '<priority>0.8</priority>'
      + '</url>';
  }).join('');

  var xml = '<?xml version="1.0" encoding="UTF-8"?>'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    + '<url><loc>https://ays.homes/</loc><priority>1.0</priority></url>'
    + '<url><loc>https://ays.homes/#properties</loc><priority>0.9</priority></url>'
    + '<url><loc>https://ays.homes/#cars</loc><priority>0.7</priority></url>'
    + urls
    + '</urlset>';

  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
};
