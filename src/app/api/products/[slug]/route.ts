// src/app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectToDatabase();

  const product = await Product.findOne({ slug: params.slug }).exec();
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
