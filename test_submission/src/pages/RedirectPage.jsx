import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./ShortenerPage";
import { logger } from "../utils/logger";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = db[shortcode];
    if (!entry) {
      logger("Shortcode not found", "error");
      return navigate("/");
    }

    const now = new Date();
    if (now > new Date(entry.expiry)) {
      logger("Shortcode expired", "error");
      return navigate("/");
    }

    logger(`Redirecting to ${entry.url}`);
    window.location.href = entry.url;
  }, [shortcode, navigate]);

  return null;
}
