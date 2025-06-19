#!/usr/bin/env bash

# Configuration
URL="https://cloudflare-opennext-15.mentimeter.workers.dev/server-static"          # CF OpenNext 1.3 Next 15
RPS=30
DURATION=60
TMP_FILE=$(mktemp "/tmp/ttfb.XXXXXX")
END_TIME=$((SECONDS + DURATION))

echo "Starting TTFB collection for $URL with $RPS RPS for $DURATION seconds..."

make_request() {
    local result
    result=$(curl -o /dev/null -s -w '%{time_starttransfer}\n' "$URL")
    if [[ $? -eq 0 && "$result" =~ ^[0-9.]+$ ]]; then
        printf "%s\n" "$result" >> "$TMP_FILE"
    fi
}

# Collect data
while [ $SECONDS -lt $END_TIME ]; do
    for ((i = 0; i < RPS; i++)); do
        make_request &
    done
    wait
    sleep 1
done

mapfile -t TTFB_DATA < "$TMP_FILE"
rm "$TMP_FILE"

TOTAL=${#TTFB_DATA[@]}

if [ $TOTAL -eq 0 ]; then
    echo "❌ No TTFB data collected. Check your URL or network."
    exit 1
fi

calculate_percentile() {
    local percentile=$1
    local sorted=($(printf '%s\n' "${TTFB_DATA[@]}" | sort -n))
    local n=${#sorted[@]}
    local rank=$(echo "($percentile / 100) * $n" | bc -l)
    local index=$(printf "%.0f\n" "$rank")
    ((index--))  # Convert to 0-based index
    (( index < 0 )) && index=0
    (( index >= n )) && index=$((n - 1))
    echo "${sorted[$index]}"
}

echo
echo "✅ TTFB collection complete. Total samples: $TOTAL"
echo "Percentiles:"
echo "p75: $(calculate_percentile 75) seconds"
echo "p90: $(calculate_percentile 90) seconds"
echo "p95: $(calculate_percentile 95) seconds"
echo "p99: $(calculate_percentile 99) seconds"
