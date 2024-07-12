export type Categories = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}