import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Catch-all route handler for legacy URL patterns.
 * Redirects /streamer1/streamer2/... to /?streamers=streamer1,streamer2,...
 */
export default function StreamersCatchAll() {
    const router = useRouter();

    useEffect(() => {
        // Wait for router to be ready
        if (!router.isReady) return;
        const { streamers } = router.query;

        // If we have streamers in the path, redirect to query param format
        if (streamers && Array.isArray(streamers) && streamers.length > 0) {
            const streamerList = streamers.join(",");
            router.replace(`/?streamers=${streamerList}`);
        } else {
            // No streamers, redirect to home
            router.replace("/");
        }
    }, [router]);

    // Show nothing while redirecting
    return null;
}
