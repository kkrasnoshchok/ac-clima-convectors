// src/app/products/[slug]/page.tsx
"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
};

const ProductPage = ({ params }: { params: { slug: string } }) => {
  // const { slug } = params;
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch product by slug
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          router.push("/404"); // Redirect to 404 if product not found
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [slug, router]);

  const handleCheckout = async () => {
    if (!product) return;
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Failed to redirect to checkout.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-w-md object-cover rounded-lg"
        width={200}
        height={200}
      />
      <p className="mt-4 text-lg">{product.description}</p>
      <p className="mt-2 text-xl font-semibold">${product.price}</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 py-2 px-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
};

export default ProductPage;
