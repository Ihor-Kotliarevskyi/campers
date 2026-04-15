# TravelTrucks

Camper rental website - browse, filter, and book campervans across Ukraine.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- TanStack Query v5
- Formik + Yup
- Swiper

## Pages

- `/` - home page with hero section
- `/catalog` - camper listing with filters and infinite scroll
- `/catalog/[camperId]` - camper detail with photo gallery, reviews, and booking form

## API

[https://campers-api.goit.study/docs](https://campers-api.goit.study/docs)

Key endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/campers` | Paginated list with filters (`location`, `form`, `engine`, `transmission`) |
| GET | `/campers/filters` | Available filter values |
| GET | `/campers/:id` | Camper details with gallery |
| GET | `/campers/:id/reviews` | Camper reviews |
| POST | `/campers/:id/booking-requests` | Submit booking (`name`, `email`) |

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
