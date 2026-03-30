# AyS Soluciones — Guía de configuración
## Hacerlo una sola vez (unos 15-20 minutos)

---

## PASO 1 — Crear cuenta en Supabase (gratis)

1. Andá a **https://supabase.com** y creá una cuenta (podés entrar con Google).
2. Hacé clic en **"New project"**.
3. Poné un nombre: `ays-soluciones`
4. Creá una contraseña para la base de datos (guardala, aunque no la vas a necesitar seguido).
5. Elegí la región más cercana: `South America (São Paulo)`.
6. Esperá ~2 minutos mientras se crea el proyecto.

---

## PASO 2 — Crear la tabla de publicaciones

1. En el panel de Supabase, andá a **SQL Editor** (icono de base de datos en la barra izquierda).
2. Copiá y pegá **exactamente** este código, luego hacé clic en **Run**:

```sql
-- Tabla principal de publicaciones
CREATE TABLE listings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  kind text NOT NULL CHECK (kind IN ('property','car')),
  title text,
  price text,
  currency text DEFAULT '$',
  description text,
  featured boolean DEFAULT false,
  photos jsonb DEFAULT '[]',
  amenidades jsonb DEFAULT '[]',
  -- Campos de propiedades
  prop_type text,
  operation text,
  location text,
  beds int,
  baths int,
  parking int,
  area int,
  -- Campos de autos
  brand text,
  year text,
  km text,
  transmission text,
  fuel text,
  color text
);

-- Permisos de lectura pública (para que el sitio muestre las publicaciones)
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON listings
  FOR SELECT USING (true);

CREATE POLICY "Escritura solo autenticada o anon" ON listings
  FOR ALL USING (true);
```

3. Deberías ver `Success. No rows returned.` — eso es correcto.

---

## PASO 3 — Crear el storage para fotos

1. En el panel de Supabase, andá a **Storage** (icono de archivos).
2. Hacé clic en **"New bucket"**.
3. Nombre: `listing-photos`
4. Activá **"Public bucket"** (importante para que las fotos se vean en el sitio).
5. Hacé clic en **"Create bucket"**.
6. Luego andá a **Policies** dentro del bucket y agregá:
   - Hacé clic en **"Add policies"** → **"For full customization"**
   - Nombre: `Public Access`
   - Allowed operations: ✅ SELECT, ✅ INSERT, ✅ UPDATE, ✅ DELETE
   - Policy definition: `true`
   - Guardá.

---

## PASO 4 — Obtener las credenciales

1. En el panel de Supabase, andá a **Settings** → **API** (tuerca en la barra izquierda).
2. Copiá:
   - **Project URL**: algo como `https://abcdefg.supabase.co`
   - **anon public** key: una cadena larga que empieza con `eyJ...`
3. Guardá estos dos valores, los vas a necesitar en el paso siguiente.

---

## PASO 5 — Configurar el admin

1. Abrí el archivo `admin.html` en el navegador.
2. Ingresá con la contraseña inicial: **`ays2025admin`**
3. Andá a la pestaña **Config**.
4. Pegá la **URL de Supabase** y la **clave anónima** en los campos correspondientes.
5. Si querés, cambiá la contraseña del panel (¡recomendado!).
6. Tocá **Guardar configuración**.

Listo — ya podés crear publicaciones desde el panel.

---

## PASO 6 — Subir los archivos al hosting

### Opción A: Vercel (recomendado)

1. Creá cuenta en **https://vercel.com** (gratis, podés entrar con GitHub o Google).
2. Hacé clic en **"Add New Project"** → **"Browse"**.
3. Subí una carpeta con estos archivos:
   ```
   index.html         ← Renombrá ays-soluciones.html a index.html
   admin.html
   ```
4. Vercel te da una URL gratuita: `tu-proyecto.vercel.app`
5. Si tenés dominio propio (ej: `ays.homes`), podés conectarlo en Settings → Domains.

### Opción B: Netlify

1. Creá cuenta en **https://netlify.com** (gratis).
2. Arrastrá la carpeta con los archivos directamente a la página principal de Netlify.
3. En segundos tenés una URL pública.

---

## PASO 7 — Uso diario (tus papás)

### Para publicar algo nuevo:
1. Abrí `tu-sitio.vercel.app/admin.html` desde el celular.
2. Ingresá con la contraseña.
3. Tocá **"Nueva propiedad"** o **"Nuevo auto"**.
4. Completá los campos, seleccioná fotos desde la galería.
5. Tocá **Guardar** — aparece en el sitio de inmediato.

### Para editar:
1. Entrá al admin → buscá la publicación → tocá **Editar**.

### Para eliminar:
1. Entrá al admin → buscá la publicación → tocá **Eliminar** → confirmá.

---

## Preguntas frecuentes

**¿Tiene costo?**
No. Supabase Free tier incluye 500MB de base de datos y 1GB de storage — más que suficiente para este uso. Vercel/Netlify también son gratis.

**¿Qué pasa si Supabase no está configurado?**
El sitio muestra los datos de ejemplo del HTML (las propiedades y autos de demostración).

**¿Cómo recupero la contraseña del admin?**
Abrí el archivo `admin.html` en un editor de texto, buscá `DEFAULT_PWD` y cambiá el valor. O entrás a la pestaña Config con acceso directo al localStorage del navegador.

**¿Puedo agregar más campos?**
Sí, con un pequeño cambio en el SQL de Supabase. Contáctame y lo ajustamos.

---

## Archivos entregados

| Archivo | Descripción |
|---------|-------------|
| `index.html` (ays-soluciones.html) | El sitio público, con listings dinámicos |
| `admin.html` | Panel de administración para tus papás |
| `SETUP.md` | Esta guía |
