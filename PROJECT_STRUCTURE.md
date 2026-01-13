# Aurapan Complete Project Tree (Exhaustive)

```text
microservices-ecommerce-main/
├── .github/
│   └── workflows/
│       ├── deploy-client.yaml            # CD for Client
│       ├── deploy-expiration.yaml        # CD for Expiration
│       ├── deploy-manifests.yaml         # K8s Manifest Sync
│       ├── deploy-order.yaml             # CD for Order
│       ├── deploy-payment.yaml           # CD for Payment
│       ├── deploy-product.yaml           # CD for Product
│       ├── deploy-user.yml               # CD for User
│       ├── initial-deploy-client.yaml    # Bootstrap for Client
│       ├── initial-deploy-expiration.yaml# Bootstrap for Expiration
│       ├── initial-deploy-order.yaml     # Bootstrap for Order
│       ├── initial-deploy-payment.yaml   # Bootstrap for Payment
│       ├── initial-deploy-product.yaml   # Bootstrap for Product
│       ├── initial-deploy-user.yml       # Bootstrap for User
│       ├── tests-order.yml               # CI tests (Order)
│       ├── tests-payment.yml             # CI tests (Payment)
│       ├── tests-product.yml             # CI tests (Product)
│       └── tests-user.yml                # CI tests (User)
├── client/
│   ├── api/
│   │   └── build-client.js               # Logic for Axios requests (SSM/Client)
│   ├── components/
│   │   ├── account/                      # User account UI elements
│   │   ├── cart/                         # Cart summary & items UI
│   │   ├── common/                       # Generic components (Loader, ImageSwiper)
│   │   ├── dashboard/                    # User & Admin dashboards
│   │   ├── footer/                       # Website footer
│   │   ├── header/                       # Header, Navbars, Dropdowns
│   │   ├── home/                         # Landing page specific logic
│   │   └── product/                      # Product cards, detail view, reviews
│   ├── hooks/
│   │   ├── useRequest.js                 # Shared hook for handling API requests
│   │   └── useWindowSize.js              # Responsive UI helper hook
│   ├── lib/
│   │   └── ga/                           # Google Analytics utilities
│   ├── pages/                            # Next.js File-based routing
│   │   ├── _app.js                       # Main App context & data loader
│   │   ├── _document.js                  # Custom HTML structure
│   │   ├── index.js                      # Home page
│   │   ├── cart.js                       # Shopping cart page
│   │   ├── checkout.js                   # Step 1 of checkout
│   │   ├── payment.js                    # Step 2 (payment) page
│   │   ├── signin.js                     # Sign in page
│   │   ├── signout.js                    # Logout handler
│   │   ├── signup.js                     # Registration page
│   │   ├── products/                     # Main shop routes
│   │   │   ├── index.js                  # Redirect to home
│   │   │   ├── bestseller.js             # General bestseller view
│   │   │   ├── [productId].js            # Dynamic product detail page
│   │   │   ├── tops/                     # Category: Tops (and sub-pages)
│   │   │   │   ├── index.js
│   │   │   │   ├── bestseller.js
│   │   │   │   ├── new-arrivals.js
│   │   │   │   ├── recommended.js
│   │   │   │   └── ... (sale, trending, etc.)
│   │   │   ├── bottoms/                  # Category: Bottoms (and sub-pages)
│   │   │   ├── dresses/                  # Category: Dresses (and sub-pages)
│   │   │   ├── sets/                     # Category: Sets (and sub-pages)
│   │   │   └── coats/                    # Category: Coats (and sub-pages)
│   │   ├── admin/                        # Admin dashboard pages
│   │   ├── dashboard/                    # User profile pages
│   │   └── orders/                       # Order history & status
│   ├── public/
│   │   └── asset/                        # Banners, logos, UI Icons
│   ├── styles/
│   │   └── app.css                       # Global styles & Bootstrap overrides
│   ├── .dockerignore
│   ├── Dockerfile                        # Production Docker setup
│   ├── dev.Dockerfile                    # Development Docker setup (Fast)
│   ├── next.config.js                    # Next.js project settings
│   └── package.json                      # Frontend dependencies
├── expiration/                           # Background Order Timeout Service
│   ├── src/
│   │   ├── events/
│   │   │   ├── listeners/                # Listens for OrderCreated
│   │   │   └── publishers/               # Publishes ExpirationComplete
│   │   ├── queues/                       # Bull.js (Redis) queue logic
│   │   ├── index.ts                      # App entry & Redis setup
│   │   └── NatsWrapper.ts                # NATS connection singleton
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── infra/                                # Kubernetes Manifests
│   ├── issuer/                           # SSL/Cert-manager config
│   ├── k8s/                              # Base deployments & services
│   ├── k8s-dev/                          # Local Ingress (aurapan.com)
│   └── k8s-prod/                         # Managed LoadBalancer manifests
├── order/                                # Order Management Service
│   ├── src/
│   │   ├── events/
│   │   │   ├── listeners/                # Syncs local Product cache
│   │   │   └── publishers/               # Order status change events 
│   │   ├── models/                       # Mongoose (Order & Product)
│   │   ├── routes/                       # Order lifecycle API
│   │   ├── types/                        # Service-specific data types
│   │   ├── app.ts                        # Express logic
│   │   ├── index.ts                      # Cluster startup
│   │   └── NatsWrapper.ts
│   ├── Dockerfile
│   └── package.json
├── payment/                              # Payment Service (Stripe/PayPal)
│   ├── src/
│   │   ├── events/                       # Payment & Order listeners
│   │   ├── models/                       # Payment record model
│   │   ├── routes/                       # create-payment route
│   │   ├── app.ts                        # Stripe integration logic
│   │   ├── index.ts
│   │   ├── stripe.ts                     # Stripe API client setup
│   │   └── NatsWrapper.ts
│   ├── Dockerfile
│   └── package.json
├── product/                              # Catalog & Review Service
│   ├── src/
│   │   ├── events/                       # CRUD events for products
│   │   ├── models/                       # Product & Review Mongoose models
│   │   ├── routes/                       # Products & ratings API
│   │   ├── app.ts
│   │   ├── index.ts
│   │   └── NatsWrapper.ts
│   ├── Dockerfile
│   └── package.json
├── user/                                 # User Auth & Profile Service
│   ├── src/
│   │   ├── models/                       # User schema
│   │   ├── routes/                       # Auth endpoints (signup, signin)
│   │   ├── services/                     # Password encryption (scrypt)
│   │   ├── app.ts
│   │   ├── index.ts
│   │   └── tsconfig.json
│   ├── Dockerfile
│   └── package.json
├── .editorconfig                         # Shared IDE settings
├── .env.example                          # Expected environment variables
├── .gitignore                            # Files to ignore (Overview, Binaries)
├── LICENSE                               # MIT License
├── PROJECT_OVERVIEW.md                   # Detailed project overview (Ignored)
├── PROJECT_STRUCTURE.md                  # This mapping (Ignored)
├── README.md                             # Major project info
├── README_2.md                           # Local execution guide
├── setup.sh                              # CI/Build bash script
├── skaffold.exe                          # Skaffold binary for Windows (Ignored)
└── skaffold.yaml                         # Local orchestrator config
```
