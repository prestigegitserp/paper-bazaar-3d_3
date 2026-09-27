# Open-source review → implementation decisions

Reviewed 2026-09-27. This rebuild uses original UI/scene implementation and existing project dependencies, not wholesale copies of external storefront source or artwork. Repository popularity is not used as evidence of suitability. Dependency versions remain pinned to the existing compatible set; package-lock now makes installation reproducible.

| Source | Pattern examined | Decision in Paper Bazaar 03 |
|---|---|---|
| [React Three Fiber scaling performance](https://github.com/pmndrs/react-three-fiber/blob/master/docs/advanced/scaling-performance.mdx) | Demand rendering, geometry reuse, avoiding unnecessary GPU work | Lazy-load all 3D; use demand mode in studio; no perpetual animation or useFrame loop |
| [Drei](https://github.com/pmndrs/drei) | OrbitControls, rounded geometry, bounded contact-shadow pass | Orbit interaction invalidates when needed; optional one-frame contact shadows, capped DPR |
| [Three.js](https://github.com/mrdoob/three.js) | Material and geometry building blocks | Small procedural studio with standard rough materials and simple lights; no external textures or HDR |
| [Medusa B2B starter](https://github.com/medusajs/b2b-starter-medusa) | Catalog-to-cart B2B flow and bulk purchasing | Catalog first, filter and compare, quantity-aware inquiry draft; no dependency on a new commerce backend |
| [Zustand](https://github.com/pmndrs/zustand) | Minimal state and selectors | Retain existing world store only in lazy walkthrough; bridge quote state at entry/exit rather than importing world state in landing page |
| [GLTFJSX](https://github.com/pmndrs/gltfjsx) | Reusable asset structures and asset optimization | Keep authored assets as an optional detailed experience; no new GLB dependency on startup. Future scanned shops should follow reusable asset contracts |

## Deliberate scope

The key change is progressive loading: purchase discovery works immediately, while spatial experiences load on intent. The inherited complex mall is retained, not claimed to have undergone a complete geometry rebuild. The new studio is a separate low-complexity scene. Multi-user accounts, real supplier onboarding, confirmed stock, messaging and payment require backend/product work and are not represented as completed features.

## License approach

The existing project's MIT notice is retained. React Three Fiber, Drei, Three.js, Zustand and Medusa references informed architecture; no external model, texture pack, storefront branding or source tree was copied. Runtime packages carry their upstream licenses in npm. Generated paper illustrations are original CSS and geometry. Consult upstream licenses before importing further source or assets.
