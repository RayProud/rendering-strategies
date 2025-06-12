import requests
import time
import csv
import statistics
from datetime import datetime

# Configuration
URL = "https://cloudflare-opennext-14.mentimeter.workers.dev/server-static"  # CF OpenNext Next 14
INTERVAL = 1  # Interval between requests in seconds
DURATION = 60  # Duration to run the script in seconds (10 minutes)
OUTPUT_FILE = "ttfb_results.csv"

def get_ttfb(url):
    """Measures the Time to First Byte (TTFB) for a given URL."""
    start_time = time.time()
    response = requests.get(url)
    ttfb = response.elapsed.total_seconds()
    return ttfb

def main():
    end_time = time.time() + DURATION
    ttfb_data = []

    print(f"Starting TTFB collection for {URL}...")
    while time.time() < end_time:
        try:
            ttfb = get_ttfb(URL)
            ttfb_data.append(ttfb)
            print(f"TTFB: {ttfb:.3f} seconds")
        except Exception as e:
            print(f"Error during request: {e}")
            ttfb_data.append(None)  # Log None for failed requests

        time.sleep(INTERVAL)

    # Remove None values (failed requests)
    ttfb_data = [t for t in ttfb_data if t is not None]

    # Output data to CSV
    with open(OUTPUT_FILE, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["TTFB (seconds)"])
        writer.writerows([[t] for t in ttfb_data])

    print(f"Data collection complete. Results saved to {OUTPUT_FILE}")

    # Calculate percentiles
    percentiles = {
        "p75": round(statistics.quantiles(ttfb_data, n=100)[74], 3),
        "p90": round(statistics.quantiles(ttfb_data, n=100)[89], 3),
        "p95": round(statistics.quantiles(ttfb_data, n=100)[94], 3),
        "p99": round(statistics.quantiles(ttfb_data, n=100)[98], 3),
    }

    print("\nPercentiles:")
    for key, value in percentiles.items():
        print(f"{key}: {value} seconds")

if __name__ == "__main__":
    main()