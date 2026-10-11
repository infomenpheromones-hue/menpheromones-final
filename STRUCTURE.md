# STRUCTURE.md — How This Project Works

A full walkthrough of the codebase: what's where, how the pieces connect, and how to get it running end to end. Read this alongside `PROJECT.md` (the client brief/quotation).

## Tech Stack

- **Frontend:** React 18 + Vite, `react-router-dom` for routing. Plain hand-written CSS (no Tailwind, no UI kit) — every component/page has its own co-located `.css` file.
- **Backend:** Supabase — Postgres database, Auth (admin login), Storage (product images), 2 Edge Functions (Razorpay).
- **Payments:** Cash on Delivery, and Razorpay for online payments (cards/UPI/netbanking).

## Folder-by-Folder

```
menpheromones/
├── PROJECT.md              Client brief & quotation (the source of truth for scope)
├── STRUCTURE.md            This file
├── .env.example             Template for required environment variables
├── index.html                Vite entry HTML, loads Google Fonts (Cinzel + Open Sans)
├── package.json / vite.config.js
├── public/images/            Static images (hero + starter product photos)
├── supabase/
│   ├── schema.sql             Run once in Supabase SQL Editor — creates tables, RLS policies, storage bucket
│   ├── seed-products.sql      Optional — pre-populates the 3 starter products
│   └── functions/
│       ├── create-razorpay-order/    Edge Function: creates a Razorpay order (holds the secret key)
│       └── verify-razorpay-payment/  Edge Function: verifies payment signature server-side
└── src/
    ├── main.jsx                App entry — wraps <App /> in <BrowserRouter>
    ├── App.jsx                 All routes are defined here (public pages vs admin pages)
    ├── App.css / index.css     index.css holds the design system: colors, fonts, the
    │                            .shiny-gold-text gold-shimmer effect, .btn/.gold-panel utility classes
    ├── lib/
    │   ├── supabaseClient.js   Creates the Supabase client from env vars; exports isSupabaseConfigured
    │   ├── seedProducts.js     Placeholder catalog used until Supabase has real data
    │   ├── productsApi.js      fetchProducts/fetchProductBySlug (public) + createProduct/updateProduct/
    │   │                        deleteProduct/uploadProductImage (admin-only, needs an authenticated session)
    │   ├── ordersApi.js        createOrder (checkout), fetchOrders/updateOrderStatus (admin)
    │   └── razorpay.js         Loads Razorpay's checkout.js, calls the 2 Edge Functions
    ├── context/
    │   ├── CartContext.jsx     Cart state, persisted to localStorage — no backend involved until checkout
    │   └── AuthContext.jsx     Wraps Supabase Auth session (admin login/logout)
    ├── components/
    │   ├── layout/              Navbar, Footer — shown on every public page
    │   ├── common/ProductCard   Reused on Home + Products pages
    │   └── admin/                ProtectedRoute (blocks /admin/* until logged in), AdminLayout (sidebar), ProductForm
    └── pages/                    One folder per route, each with its .jsx + co-located .css
        ├── Home, Products, ProductDetail, Science, Cart, Checkout, Contact, FAQ, PrivacyPolicy, Terms
        └── admin/AdminLogin, AdminDashboard, AdminProducts, AdminOrders
```

## Routing Map

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero, features, science section, 3 featured products, testimonial, CTA |
| `/products` | Products | Full catalog grid |
| `/products/:slug` | ProductDetail | Full description, ingredients, add to cart |
| `/science` | Science | "Science of Attraction" content + ingredient breakdown |
| `/cart` | Cart | Line items, quantity edit, subtotal |
| `/checkout` | Checkout | Delivery form + COD/Razorpay choice |
| `/checkout/success` | CheckoutSuccess | Order confirmation |
| `/contact` | Contact | Enquiry form + business details |
| `/faq`, `/privacy-policy`, `/terms` | Static content pages |
| `/admin/login` | AdminLogin | Supabase Auth email/password |
| `/admin`, `/admin/products`, `/admin/orders` | Admin panel | All behind `ProtectedRoute` — redirects to `/admin/login` if not authenticated |

## How the Cart Works

`CartContext` (`src/context/CartContext.jsx`) holds `items` in React state and mirrors it to `localStorage` on every change, so a cart survives a page refresh. Nothing is written to Supabase until checkout — `createOrder()` (`src/lib/ordersApi.js`) is the only point where cart contents become a database row.

## How Supabase Is Wired

`src/lib/supabaseClient.js` reads `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` from `.env`. If they're missing, `supabase` is `null` and `isSupabaseConfigured` is `false` — the storefront falls back to `seedProducts.js` so the site is still browsable, and admin/checkout show a clear "not connected" message instead of crashing.

Once real keys are added, `productsApi.js` and `ordersApi.js` automatically start reading/writing real data — no code changes needed.

**Row Level Security (RLS)** is the real access control, not just hiding admin UI in the frontend: anyone can read products and insert an order, but only an authenticated (logged-in) session can write products or read/update orders. See `supabase/schema.sql` for the exact policies.

## How Admin Auth Works

There's no public sign-up page. The admin account is created manually in the Supabase dashboard (Authentication → Users → Add User). `AuthContext.jsx` wraps `supabase.auth` — `login()` calls `signInWithPassword`, and `ProtectedRoute.jsx` redirects to `/admin/login` whenever there's no active session.

## How Razorpay Works

1. `src/lib/razorpay.js` loads `checkout.js` from Razorpay's CDN client-side.
2. It calls the `create-razorpay-order` Edge Function (server-side, holds `RAZORPAY_KEY_SECRET`) to get an order id.
3. Razorpay's modal opens using only the public `VITE_RAZORPAY_KEY_ID`.
4. On success, `verify-razorpay-payment` re-checks the signature server-side (never trust the client's word that a payment succeeded).
5. Only then does `Checkout.jsx` call `createOrder()` with `payment_status: 'paid'`.

COD skips all of this — it just calls `createOrder()` directly with `payment_status: 'pending'`.

## Local Development

```bash
npm install
cp .env.example .env   # fill in values once available (see below)
npm run dev
```

The site runs and is fully browsable even with an empty `.env` — it just uses placeholder product data and shows "not connected" on admin/checkout actions that need a real backend.

## Supabase Setup (one-time)

1. Create a Supabase project (Project Settings → API gives you the URL + anon key → put them in `.env`).
2. SQL Editor → run `supabase/schema.sql`.
3. (Optional) SQL Editor → run `supabase/seed-products.sql` to pre-populate the 3 starter products.
4. Authentication → Users → Add User → create the admin login (email + password).
5. Storage → confirm the `products` bucket exists (created by `schema.sql`) and is public.
6. Edge Functions → deploy both functions:
   ```bash
   supabase functions deploy create-razorpay-order
   supabase functions deploy verify-razorpay-payment
   supabase secrets set RAZORPAY_KEY_ID=xxx RAZORPAY_KEY_SECRET=xxx
   ```

## Still Needed From the Client (not blocking development)

- Supabase project URL + anon key
- Razorpay Key ID + Key Secret (test-mode keys are fine to start)
- Real business contact details (phone, email, address, socials) for Contact page/footer
- Confirmation on the 3 placeholder products, or a real product list to replace them
- Sign-off on the placeholder Privacy Policy / Terms text (currently generic boilerplate — see the `[Placeholder]` markers in those pages)
- Desired admin login email

## Deployment

Any static host works (Vercel/Netlify/Cloudflare Pages) — this is a plain Vite build (`npm run build` → `dist/`). Set the same 3 `VITE_*` env vars in the host's dashboard. The Supabase Edge Functions deploy separately via the Supabase CLI (see above) — they're not part of the frontend build.

## Ownership Handover

The project itself never needs to move — Supabase organizations and Vercel/Netlify projects support inviting another account as Owner and then removing yourself. When the client is ready:
1. Invite their email as Owner on the Supabase organization → they accept → you can leave.
2. Same pattern for the hosting provider (Vercel/Netlify) and this GitHub repo, if used.
3. No code or environment variables need to change — only membership.
