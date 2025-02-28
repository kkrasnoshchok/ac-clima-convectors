import Link from "next/link";

async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {
  const products = (await fetchProducts()) as {
    _id: string;
    name: string;
    description: string;
    price: string;
    slug: string;
  }[];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="mt-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="border p-2 mb-2 hover:bg-gray-100 transition"
          >
            <Link href={`/products/${product.slug}`} className="block">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
