"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { TBannerFormData } from "@/validations/banner.validation";
import { cn } from "@/lib/utils";
import {
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from "@/redux/api/bannerApi";
import AErrorMessage from "../AErrorMessage";
import ASpinner from "../ui/ASpinner";
import { useEffect, useRef } from "react";
import handleMutation from "@/utils/handleMutation";

export function EditBannerModal({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const {
    data,
    isLoading: isFetching,
    isError,
    error,
    refetch,
  } = useGetSingleBannerQuery(id, { skip: !id });

  const banner = data?.data;

  const [updateBanner, { isLoading }] = useUpdateBannerMutation();

  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TBannerFormData>({
    defaultValues: { title: "", description: "" },
  });

  // Ref to access the DialogClose component
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  // Update form with fetched data when available
  useEffect(() => {
    if (!isFetching && banner) {
      reset({
        title: banner.title,
        description: banner.description,
      });
    }
  }, [banner, isFetching, reset]);

  // Handle form submission
  const onSubmit = async (data: TBannerFormData) => {
    await handleMutation(
      { data, id },
      updateBanner,
      "Updating banner...",
      () => {
        closeDialogRef.current?.click();
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        {isFetching ? (
          <ASpinner cl="py-22" />
        ) : isError ? (
          <AErrorMessage
            className="py-16"
            message={(error as any)?.data?.message}
            onRetry={refetch}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-3">
            {/* Title Field */}
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter banner title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-destructive text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter banner description"
                rows={12}
                className={cn(
                  "min-h-28",
                  errors.description ? "border-destructive" : ""
                )}
                style={{ height: "auto" }}
              />
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button" ref={closeDialogRef}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
