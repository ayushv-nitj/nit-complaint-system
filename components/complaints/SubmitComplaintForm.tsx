"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { COMPLAINT_CATEGORIES } from "@/lib/constants"

const complaintSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000),
  category: z.enum(["HOSTEL", "MESS", "ACADEMIC", "INTERNET_NETWORK", "INFRASTRUCTURE", "OTHERS"]),
  location: z.string().optional(),
})

type ComplaintForm = z.infer<typeof complaintSchema>

interface SubmitComplaintFormProps {
  onSuccess: () => void
}

export function SubmitComplaintForm({ onSuccess }: SubmitComplaintFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
  })

  const category = watch("category")

  const onSubmit = async (data: ComplaintForm) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || "Failed to submit complaint")
        return
      }

      toast.success("Complaint submitted successfully!")
      onSuccess()
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select
          value={category}
          onValueChange={(value) => setValue("category", value as any)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {COMPLAINT_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Brief description of the issue"
          {...register("title")}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Provide detailed information about the issue"
          rows={5}
          {...register("description")}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location (Optional)</Label>
        <Input
          id="location"
          placeholder="e.g., Room 201, Ambedkar Hall"
          {...register("location")}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Complaint"}
      </Button>
    </form>
  )
}