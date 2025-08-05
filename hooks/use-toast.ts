export function useToast() {
  return {
    toast: ({ title, description }: { title: string; description?: string }) => {
      console.log("🔥 TOAST:", title, description)
      alert(`${title}\n${description ?? ""}`)
    },
  }
}
