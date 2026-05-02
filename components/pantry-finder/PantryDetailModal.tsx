import { useState, useEffect } from "react";
import { Button } from "@/components/tailgrids/core/button";
import {
  Bell,
  Calendar,
  ChevronRight,
  Flag,
  Heart,
  Info,
  Leaf,
  MapPin,
  Phone,
  Star,
  X,
  MessageSquare,
} from "./icons";
import type { PantryDocument, Review } from "@/firebase/models/Pantry";
import { useAuth } from "@/context/AuthContext";
import { toggleHeart, addReview, fetchPantryReviews } from "@/firebase/services";

interface PantryDetailModalProps {
  pantry: PantryDocument;
  onClose: () => void;
}

function getUniqueFoods(services: PantryDocument["services"]) {
  const foods = new Set<string>();
  services?.forEach((s) => (s as any).foodOfferings?.forEach((f: string) => foods.add(f)));
  return [...foods];
}

export function PantryDetailModal({ pantry, onClose }: PantryDetailModalProps) {
  const { user, openAuthModal } = useAuth();
  const [hearts, setHearts] = useState<string[]>(pantry.hearts || []);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  const isHearted = user ? hearts.includes(user.uid) : false;
  const allFoods = getUniqueFoods(pantry.services);
  
  const address = pantry.address1 
    ? `${pantry.address1}${pantry.address2 ? `, ${pantry.address2}` : ""}, ${pantry.city}, ${pantry.state} ${pantry.zipCode}`
    : (pantry as any).address;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchPantryReviews(pantry.id);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    loadReviews();
  }, [pantry.id]);

  const handleToggleHeart = async () => {
    if (!user) {
      openAuthModal();
      return;
    }

    const newIsHearted = !isHearted;
    // Optimistic update
    if (newIsHearted) {
      setHearts([...hearts, user.uid]);
    } else {
      setHearts(hearts.filter((id) => id !== user.uid));
    }

    try {
      await toggleHeart(pantry.id, user.uid, newIsHearted);
    } catch (error) {
      console.error("Error toggling heart:", error);
      // Rollback on error
      setHearts(pantry.hearts || []);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal();
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const review = await addReview({
        pantryId: pantry.id,
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        userPhoto: user.photoURL || undefined,
        rating: newRating,
        comment: newComment.trim(),
      });
      setReviews([review, ...reviews]);
      setNewComment("");
      setNewRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="mt-12 w-full max-w-[720px] overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <div className="relative bg-gradient-to-br from-pantry-dark to-pantry-medium px-8 pb-7 pt-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 font-serif text-2xl font-bold text-white">
              {pantry.name.charAt(0)}
            </div>
            <div>
              <h2 className="mb-2 font-serif text-2xl text-white">
                {pantry.name}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <MapPin size={14} />
                {address}
              </div>
            </div>
          </div>
          {(pantry as any).status === "open-now" && (
            <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-green-300/40 bg-green-200/20 px-3.5 py-1">
              <span className="size-2 rounded-full bg-green-400" />
              <span className="text-[13px] font-semibold text-green-50">
                Open Right Now
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 border-b border-pantry-beige px-8 py-5">
          <button
            type="button"
            onClick={handleToggleHeart}
            className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              isHearted 
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" 
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Heart size={16} fill={isHearted ? "currentColor" : "none"} />
            Love · {hearts.length}
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <Bell size={16} />
            Follow Updates
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <Flag size={16} /> Report Issue
          </button>
          {pantry.phone && (
            <Button size="sm" className="bg-pantry-dark hover:bg-pantry-medium">
              <Phone size={16} /> {pantry.phone}
            </Button>
          )}
          {pantry.website && (
            <a 
              href={pantry.website.startsWith('http') ? pantry.website : `https://${pantry.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-pantry-bright px-4 py-2 text-sm font-bold text-white transition hover:bg-pantry-medium shadow-sm ml-auto"
            >
              Website <ChevronRight size={14} />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 px-8 py-6 md:grid-cols-2">
          {(pantry.aboutUs || pantry.notes) && (
            <div className="md:col-span-2 rounded-2xl bg-pantry-cream p-5">
              <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
                <Info size={15} /> About
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {pantry.aboutUs || pantry.notes}
              </p>
            </div>
          )}

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
              <Calendar size={15} /> Hours & Schedule
            </div>
            {pantry.schedules && pantry.schedules.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {pantry.schedules.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-pantry-cream px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-pantry-ink">
                        {s.weekDay}
                      </span>
                      <span className="text-[13px] font-medium text-pantry-bright">
                        {s.startTime} – {s.endTime}
                      </span>
                    </div>
                    {s.notes && (
                      <div className="mt-1 text-xs text-gray-500">
                        {s.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-pantry-cream px-4 py-3 text-[13px] text-gray-400">
                Call for schedule information: {pantry.phone || "no phone listed"}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
              <Leaf size={15} /> Available Food Types
            </div>
            {allFoods.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allFoods.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-pantry-mint-border bg-pantry-mint px-3 py-1 text-xs font-medium text-pantry-dark"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-[13px] text-gray-400">
                Contact for food availability details
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pantry-dark">
              <Star size={15} /> Services Offered
            </div>
            <div className="flex flex-col gap-2.5">
              {pantry.services?.map((svc, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-pantry-cream px-4 py-3.5"
                >
                  <div>
                    <div className="text-sm font-semibold text-pantry-ink">
                      {svc.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {svc.categoryDescription}
                      {svc.foodProgramTypeDescription && svc.foodProgramTypeDescription !== svc.categoryDescription
                        ? ` · ${svc.foodProgramTypeDescription}`
                        : ""}
                    </div>
                  </div>
                  <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] text-gray-700">
                    {svc.schedules?.length || 0} sessions/wk
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 border-t border-pantry-beige pt-6 mt-2">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-pantry-dark">
                <MessageSquare size={15} /> Reviews & Comments
              </div>
              <div className="text-xs text-gray-500">{reviews.length} reviews</div>
            </div>

            {user ? (
              <form onSubmit={handleSubmitReview} className="mb-8 rounded-2xl bg-pantry-cream p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[13px] font-medium text-gray-700">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`transition ${newRating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <Star size={18} fill={newRating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with this pantry..."
                  className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm outline-none transition focus:border-pantry-bright focus:ring-2 focus:ring-pantry-bright/10"
                  rows={3}
                  required
                />
                <div className="mt-3 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmittingReview || !newComment.trim()}
                    className="bg-pantry-dark hover:bg-pantry-medium"
                  >
                    {isSubmittingReview ? "Posting..." : "Post Review"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mb-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <p className="mb-3 text-sm text-gray-600">Please log in to leave a review</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openAuthModal()}
                >
                  Log In / Sign Up
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-6">
              {isLoadingReviews ? (
                <div className="flex justify-center py-8">
                  <div className="size-6 animate-spin rounded-full border-2 border-pantry-bright border-t-transparent" />
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <div className="size-10 shrink-0 overflow-hidden rounded-full bg-pantry-beige">
                      {review.userPhoto ? (
                        <img src={review.userPhoto} alt={review.userName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-pantry-medium text-xs font-bold text-white">
                          {review.userName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-pantry-ink">{review.userName}</span>
                        <span className="text-xs text-gray-400">
                          {review.createdAt instanceof Date 
                            ? review.createdAt.toLocaleDateString() 
                            : review.createdAt?.toDate?.().toLocaleDateString() || "Just now"}
                        </span>
                      </div>
                      <div className="mb-2 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={review.rating >= star ? "text-yellow-400" : "text-gray-200"}
                            fill={review.rating >= star ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <p className="text-[13px] leading-relaxed text-gray-700">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-gray-400">
                  No reviews yet. Be the first to share!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
