import { useMutation } from "@tanstack/react-query";
import { subscribeEmail } from "./api/subscribe";

export function useSubscribe() {
  return useMutation({
    mutationFn: subscribeEmail,
  });
}
