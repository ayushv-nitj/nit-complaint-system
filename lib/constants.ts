export const COMPLAINT_CATEGORIES = [
  { value: "HOSTEL", label: "Hostel" },
  { value: "MESS", label: "Mess" },
  { value: "ACADEMIC", label: "Academic" },
  { value: "INTERNET_NETWORK", label: "Internet/Network" },
  { value: "INFRASTRUCTURE", label: "Infrastructure" },
  { value: "OTHERS", label: "Others" },
] as const

export const COMPLAINT_STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CLAIMED: "bg-blue-100 text-blue-800 border-blue-200",
  IN_PROGRESS: "bg-purple-100 text-purple-800 border-purple-200",
  RESOLVED: "bg-green-100 text-green-800 border-green-200",
  ESCALATED: "bg-red-100 text-red-800 border-red-200",
} as const

export const PRIORITY_COLORS = {
  NORMAL: "bg-gray-100 text-gray-800",
  HIGH: "bg-red-100 text-red-800",
} as const