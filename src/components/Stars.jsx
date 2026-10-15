import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Stars({ rating = 5, className = "" }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FontAwesomeIcon key={n} icon={faStar} className={n <= rating ? "text-amber-400" : "text-slate-600"} />
      ))}
    </div>
  );
}
