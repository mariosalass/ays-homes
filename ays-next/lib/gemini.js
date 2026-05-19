export async function generateSEOText(item) {
  const prompt = `Sos un experto en SEO inmobiliario de Costa Rica.
Generá un párrafo corto (4-6 oraciones) con las frases exactas que la gente busca en Google para encontrar esta publicación.
Usá lenguaje natural y coloquial costarricense. Incluí variaciones de búsqueda como "venta", "en venta", "se vende", con ubicación, tipo de propiedad, características principales y precio si está disponible.
No uses lenguaje formal ni de agencia. Escribí como buscaría una persona real en Google.

Datos de la publicación:
Tipo: ${item.prop_type || item.business_type || (item.brand ? item.brand + ' ' + (item.model || '') : '') || ''}
Operación: ${item.operation || 'Venta'}
Ubicación: ${[item.distrito, item.canton, item.provincia].filter(Boolean).join(', ') || item.location || ''}
Precio: ${item.currency || ''}${item.price || ''}
Habitaciones: ${item.beds || ''}
Baños: ${item.baths || ''}
Área: ${item.area || ''}m²
Descripción: ${(item.description || '').slice(0, 200)}

Respondé SOLO con el párrafo, sin título, sin explicaciones, sin comillas.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch {
    return '';
  }
}
