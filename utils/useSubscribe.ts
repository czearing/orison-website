import { useMutation } from "@tanstack/react-query";

interface SubscribeData {
  email: string;
}

interface SubscribeResponse {
  success: boolean;
  message?: string;
}

async function subscribeEmail(data: SubscribeData): Promise<SubscribeResponse> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to subscribe");
  }

  return response.json();
}

export function useSubscribe() {
  return useMutation({
    mutationFn: subscribeEmail,
  });
}
