import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookingInquiry, Room, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function usePrepopulate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.prepopulateData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useGetAllRooms() {
  const { actor, isFetching } = useActor();
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBookingInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (inquiry: BookingInquiry) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitBookingInquiry(inquiry);
    },
  });
}
