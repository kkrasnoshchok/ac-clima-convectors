import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, description, price, imageUrl, slug } = await req.json();

    // Ensure slug uniqueness
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const newProduct = new Product({ name, description, price, imageUrl, slug });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log('create product err', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

