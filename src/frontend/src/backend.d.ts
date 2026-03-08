import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface BookingInquiry {
    id: bigint;
    submissionTimestamp: Time;
    specialRequests: string;
    checkInDate: Time;
    guestName: string;
    email: string;
    numGuests: bigint;
    roomTypePreference: RoomType;
    checkOutDate: Time;
    phone: string;
}
export interface Room {
    id: bigint;
    pricePerNight: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    amenities: Array<string>;
    capacity: bigint;
    roomType: RoomType;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: bigint;
    date: Time;
    reviewText: string;
    guestName: string;
    rating: bigint;
    roomTypeStayed: RoomType;
}
export enum RoomType {
    deluxe = "deluxe",
    suite = "suite",
    standard = "standard"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addRoom(room: Room): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllBookingInquiries(): Promise<Array<BookingInquiry>>;
    getAllRooms(): Promise<Array<Room>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getAvailableRooms(): Promise<Array<Room>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTestimonialsByRating(rating: bigint): Promise<Array<Testimonial>>;
    getTestimonialsByRoomType(roomType: RoomType): Promise<Array<Testimonial>>;
    getTestimonialsSortedByGuestName(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    prepopulateData(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBookingInquiry(inquiry: BookingInquiry): Promise<void>;
}
