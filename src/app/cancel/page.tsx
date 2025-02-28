import Link from "next/link";

const CancelPage = () => (
  <div className="text-center mt-20">
    <h1 className="text-3xl font-bold text-red-500">Payment Canceled</h1>
    <p className="mt-4">Your payment was not completed.</p>
    <Link href="/" className="text-blue-500 mt-4 inline-block">
      Try Again
    </Link>
  </div>
);
export default CancelPage;
