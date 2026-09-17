import { NASHIK_PLACES } from "@/lib/placesData";
import PlaceClient from "./PlaceClient";

export function generateStaticParams() {
  return NASHIK_PLACES.map((place) => ({
    id: place.id,
  }));
}

export default function PlaceDetailsPage({ params }: { params: { id: string } }) {
  return <PlaceClient id={params.id} />;
}
