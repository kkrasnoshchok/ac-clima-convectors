import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

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
    const body = await req.json();
    const product = await Product.create(body);
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
