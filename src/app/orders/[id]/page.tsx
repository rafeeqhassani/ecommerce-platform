import OrderDetailsClient from "@/app/components/OrderDetailsClient";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderDetailsClient orderId={id} />;
}
