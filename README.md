# TravelTrucks

Camper rental website — browse, filter, and book campervans across Ukraine.

**Live site:** [https://campers-mu.vercel.app](https://campers-mu.vercel.app)

## Features

- Browse a catalog of campervans with cover image, specs, and ratings
- Filter by location, body type, engine, and transmission
- Load more results with paginated API requests (4 per page)
- View full camper details with photo gallery, amenities, and reviews
- Book a camper via an inline booking form with validation
- Toast notification on successful booking

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- TanStack Query v5
- Formik + Yup
- Swiper

## Pages

- `/` — home page with hero section
- `/catalog` — camper listing with filters and load-more pagination
- `/catalog/[camperId]` — camper detail with photo gallery, reviews, and booking form

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

## API

Docs: [https://campers-api.goit.study/docs](https://campers-api.goit.study/docs)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/campers` | Paginated list with filters (`location`, `form`, `engine`, `transmission`) |
| GET | `/campers/:id` | Camper details with gallery |
| GET | `/campers/:id/reviews` | Camper reviews |
| POST | `/campers/:id/booking-requests` | Submit booking (`name`, `email`) |

## Author

Ihor Kotliarevskyi — [jagor0707@gmail.com](mailto:jagor0707@gmail.com)
