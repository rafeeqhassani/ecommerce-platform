import AdminProductDetailsClient from "@/app/components/AdminProductDetailsClient";

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  return (
    <div>
      <AdminProductDetailsClient productId={productId} />
    </div>
  );
}
