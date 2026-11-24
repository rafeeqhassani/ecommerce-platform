import ProductDetailsClient from "@/app/components/ProductDetailsClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  return <ProductDetailsClient productId={productId} />;
}
