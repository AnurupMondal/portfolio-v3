import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";

const NAMESPACE = "anurup_portfolio_v3";
const KEY = "visits";

interface CounterResponse {
  count?: number;
  value?: number;
}

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      try {
        const hasVisited = localStorage.getItem("visitor_counted");
        let url = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`;

        if (!hasVisited) {
          url += "/up";
        }

        // Use CORS proxy for localhost development
        const isLocalhost =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";
        const apiUrl = isLocalhost
          ? `https://corsproxy.io/?${encodeURIComponent(url)}`
          : url;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CounterResponse = await response.json();

        // Handle different possible response formats
        const visitorCount = data.count ?? data.value;

        if (visitorCount !== undefined && visitorCount !== null) {
          setCount(visitorCount);
          if (!hasVisited) {
            try {
              localStorage.setItem("visitor_counted", "true");
            } catch (storageError) {
              console.warn("Failed to set localStorage:", storageError);
            }
          }
        } else {
          throw new Error("Invalid response format from counter API");
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        // Set a fallback count for development when API fails
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  // Show loading state or render when we have a count
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <Users
          size={16}
          className="text-gray-700 dark:text-gray-300 animate-pulse"
        />
        <span className="text-gray-500 dark:text-gray-400">Loading...</span>
      </div>
    );
  }

  // Show visitor count if available, otherwise show error state
  if (count !== null) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <Users size={16} className="text-gray-700 dark:text-gray-300" />
        <span>Visitor Count: {count.toLocaleString()}</span>
      </div>
    );
  }

  // If error and no count, show error message
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <Users size={16} />
      <span>Visitor count unavailable</span>
    </div>
  );
};

export default VisitorCounter;
