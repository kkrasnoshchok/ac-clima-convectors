import Link from "next/link";

const SuccessPage = () => (
  <div className="text-center mt-20">
    <h1 className="text-3xl font-bold">Payment Successful!</h1>
    <p className="mt-4">Thank you for your purchase.</p>
    <Link passHref href="/" className="text-blue-500 mt-4 inline-block">
      Go back to Home
    </Link>
  </div>
);
export default SuccessPage;
