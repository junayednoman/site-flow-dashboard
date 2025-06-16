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
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerSchema, TBannerFormData } from "@/validations/banner.validation";
import { cn } from "@/lib/utils";
import { useAddBannerMutation } from "@/redux/api/bannerApi";
import handleMutation from "@/utils/handleMutation";

export function CreateBannerModal({ children }: { children: React.ReactNode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TBannerFormData>({
    resolver: zodResolver(bannerSchema),
  });

  const [createBanner, { isLoading }] = useAddBannerMutation();

  // Handle form submission
  const onSubmit = async (data: TBannerFormData) => {
    await handleMutation(data, createBanner, "Creating banner...", () =>
      reset()
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Banner</DialogTitle>
        </DialogHeader>
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
              <p className="text-destructive text-sm">{errors.title.message}</p>
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
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
