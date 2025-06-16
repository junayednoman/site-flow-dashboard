import { Skeleton } from "@/components/ui/skeleton";

const BannerSkeleton = () => {
  return (
    <div className="text-center py-10">
      <Skeleton className="mx-auto h-6 w-[70%]" />
      <Skeleton className="mx-auto h-4 mt-4 w-[80%]" />
      <Skeleton className="mx-auto h-4 mt-3 w-[80%]" />
    </div>
  );
};

export default BannerSkeleton;
