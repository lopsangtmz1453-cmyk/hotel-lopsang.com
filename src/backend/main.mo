import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type RoomType = {
    #standard;
    #deluxe;
    #suite;
  };

  public type Room = {
    id : Nat;
    name : Text;
    description : Text;
    pricePerNight : Nat;
    capacity : Nat;
    amenities : [Text];
    isAvailable : Bool;
    roomType : RoomType;
  };

  public type BookingInquiry = {
    id : Nat;
    guestName : Text;
    email : Text;
    phone : Text;
    checkInDate : Time.Time;
    checkOutDate : Time.Time;
    numGuests : Nat;
    roomTypePreference : RoomType;
    specialRequests : Text;
    submissionTimestamp : Time.Time;
  };

  public type Testimonial = {
    id : Nat;
    guestName : Text;
    rating : Nat;
    reviewText : Text;
    date : Time.Time;
    roomTypeStayed : RoomType;
  };

  public type UserProfile = {
    name : Text;
  };

  module Testimonial {
    public func compareByGuestName(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Text.compare(t1.guestName, t2.guestName);
    };
  };

  let rooms = Map.empty<Nat, Room>();
  let bookingInquiries = Map.empty<Nat, BookingInquiry>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextRoomId = 1;
  var nextBookingId = 1;
  var nextTestimonialId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Room Management
  public shared ({ caller }) func addRoom(room : Room) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add rooms");
    };
    rooms.add(nextRoomId, room);
    nextRoomId += 1;
  };

  public query ({ caller }) func getAllRooms() : async [Room] {
    rooms.values().toArray();
  };

  public query ({ caller }) func getAvailableRooms() : async [Room] {
    rooms.values().toArray().filter(func(r) { r.isAvailable });
  };

  // Booking Inquiries
  public shared ({ caller }) func submitBookingInquiry(inquiry : BookingInquiry) : async () {
    bookingInquiries.add(nextBookingId, inquiry);
    nextBookingId += 1;
  };

  public query ({ caller }) func getAllBookingInquiries() : async [BookingInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view booking inquiries");
    };
    bookingInquiries.values().toArray();
  };

  // Testimonials
  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    testimonials.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query ({ caller }) func getTestimonialsByRating(rating : Nat) : async [Testimonial] {
    testimonials.values().toArray().filter(func(t) { t.rating == rating });
  };

  public query ({ caller }) func getTestimonialsByRoomType(roomType : RoomType) : async [Testimonial] {
    testimonials.values().toArray().filter(func(t) { t.roomTypeStayed == roomType });
  };

  public query ({ caller }) func getTestimonialsSortedByGuestName() : async [Testimonial] {
    testimonials.values().toArray().sort(Testimonial.compareByGuestName);
  };

  // Pre-populate with sample data
  public shared ({ caller }) func prepopulateData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can prepopulate data");
    };

    // Sample Rooms
    let sampleRooms = [
      {
        id = 1;
        name = "Standard Room";
        description = "A cozy room with basic amenities";
        pricePerNight = 100;
        capacity = 2;
        amenities = ["WiFi", "TV"];
        isAvailable = true;
        roomType = #standard;
      },
      {
        id = 2;
        name = "Deluxe Room";
        description = "Spacious room with premium features";
        pricePerNight = 200;
        capacity = 3;
        amenities = ["WiFi", "TV", "Mini Bar"];
        isAvailable = true;
        roomType = #deluxe;
      },
      {
        id = 3;
        name = "Suite";
        description = "Luxury suite with living area";
        pricePerNight = 400;
        capacity = 5;
        amenities = ["WiFi", "TV", "Mini Bar", "Kitchen"];
        isAvailable = false;
        roomType = #suite;
      },
    ];

    for (room in sampleRooms.values()) {
      rooms.add(room.id, room);
      nextRoomId := room.id + 1;
    };

    // Sample Testimonials
    let sampleTestimonials = [
      {
        id = 1;
        guestName = "Alice";
        rating = 5;
        reviewText = "Excellent service!";
        date = 1681286400000000000;
        roomTypeStayed = #deluxe;
      },
      {
        id = 2;
        guestName = "Bob";
        rating = 4;
        reviewText = "Very comfortable stay";
        date = 1681372800000000000;
        roomTypeStayed = #standard;
      },
    ];

    for (testimonial in sampleTestimonials.values()) {
      testimonials.add(testimonial.id, testimonial);
      nextTestimonialId := testimonial.id + 1;
    };
  };
};
