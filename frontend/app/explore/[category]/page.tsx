import CategoryClient from "./CategoryClient";

export function generateStaticParams() {
  return [
    { category: "temples" },
    { category: "ghats" },
    { category: "food" },
    { category: "attractions" },
    { category: "mountains" },
    { category: "culture" },
    { category: "shopping" },
    { category: "accommodation" },
    { category: "all" },
  ];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryClient category={params.category} />;
}
