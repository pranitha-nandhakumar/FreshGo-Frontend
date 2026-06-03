import { useEffect, useState } from "react";
import { Star, MessageCircle, Trash2, Sparkles } from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const savedReviews =
      JSON.parse(localStorage.getItem("freshgoReviews")) || [];
    setReviews(savedReviews);
  }, []);

  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem("freshgoReviews", JSON.stringify(newReviews));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("freshgoCurrentUser"));

    const newReview = {
      id: Date.now(),
      userName: user?.name || "Guest User",
      productName: form.productName,
      rating: Number(form.rating),
      comment: form.comment,
      date: new Date().toLocaleDateString(),
    };

    saveReviews([newReview, ...reviews]);

    setForm({
      productName: "",
      rating: 5,
      comment: "",
    });

    alert("Review added successfully ⭐");
  };

  const deleteReview = (id) => {
    saveReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#080312] text-white py-20 px-6 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#24143d]/80 border border-lime-300/30 text-lime-300 px-5 py-2 rounded-full mb-5 shadow-[0_0_25px_rgba(223,255,94,0.18)]">
            <Sparkles size={18} />
            FreshGo Customer Voice
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Product{" "}
            <span className="text-lime-300 italic drop-shadow-[0_0_18px_rgba(223,255,94,0.45)]">
              Reviews
            </span>
          </h1>

          <p className="text-purple-200 max-w-2xl mx-auto text-lg">
            Share your FreshGo shopping experience and help others pick the
            freshest groceries.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
          >
            <h2 className="text-3xl font-extrabold mb-2">
              Write a{" "}
              <span className="text-lime-300 italic">Review</span>
            </h2>

            <p className="text-purple-200 mb-6">
              Tell us what you loved about your order.
            </p>

            <input
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              placeholder="Product name"
              className="w-full p-4 rounded-2xl mb-4 bg-[#10081f] border border-purple-400/30 text-white placeholder:text-purple-300 outline-none focus:border-lime-300 focus:shadow-[0_0_20px_rgba(223,255,94,0.2)] transition"
              required
            />

            <select
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: e.target.value })
              }
              className="w-full p-4 rounded-2xl mb-4 bg-[#10081f] border border-purple-400/30 text-white outline-none focus:border-lime-300 focus:shadow-[0_0_20px_rgba(223,255,94,0.2)] transition"
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Good</option>
              <option value="3">3 Stars - Average</option>
              <option value="2">2 Stars - Poor</option>
              <option value="1">1 Star - Bad</option>
            </select>

            <textarea
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
              placeholder="Write your review..."
              className="w-full p-4 rounded-2xl mb-5 bg-[#10081f] border border-purple-400/30 text-white placeholder:text-purple-300 outline-none h-32 resize-none focus:border-lime-300 focus:shadow-[0_0_20px_rgba(223,255,94,0.2)] transition"
              required
            />

            <button className="w-full bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold py-4 rounded-2xl shadow-[0_0_25px_rgba(223,255,94,0.35)] transition hover:scale-[1.02]">
              Submit Review
            </button>
          </form>

          <div className="space-y-5">
            {reviews.length === 0 ? (
              <div className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-lime-300/10 flex items-center justify-center mb-5 border border-lime-300/30">
                  <MessageCircle className="text-lime-300" size={42} />
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  No reviews yet
                </h3>

                <p className="text-purple-200">
                  Be the first to share your FreshGo experience.
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-6 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/40 hover:shadow-[0_0_35px_rgba(223,255,94,0.18)] transition"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">
                        {review.productName}
                      </h3>

                      <p className="text-purple-200 text-sm mt-1">
                        by{" "}
                        <span className="text-lime-300 font-semibold">
                          {review.userName}
                        </span>{" "}
                        • {review.date}
                      </p>

                      <div className="flex gap-1 text-lime-300 mt-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteReview(review.id)}
                      className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  <p className="mt-5 text-purple-100 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}