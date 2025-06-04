#!/usr/bin/env bash

# Configuration
URL="https://d3ojmmpfi3lxdg.cloudfront.net/server-static"          # AWS SST Next 14
RPS=30
DURATION=60
OUTPUT_FILE="ttfb_results.csv"

END_TIME=$((SECONDS + DURATION))
TMP_FILE=$(mktemp)
echo "TTFB (seconds)" > "$OUTPUT_FILE"

echo "Starting TTFB collection for $URL with $RPS RPS..."

make_request() {
    local result
    result=$(curl -o /dev/null -s -w '%{time_starttransfer}\n' "$URL")
    if [[ $? -eq 0 && "$result" =~ ^[0-9.]+$ ]]; then
        printf "%s\n" "$result" >> "$TMP_FILE"
    fi
}

while [ $SECONDS -lt $END_TIME ]; do
    for ((i = 0; i < RPS; i++)); do
        make_request &
    done
    wait
    sleep 1
done

cat "$TMP_FILE" >> "$OUTPUT_FILE"
rm "$TMP_FILE"

mapfile -t TTFB_DATA < <(tail -n +2 "$OUTPUT_FILE")

if [ ${#TTFB_DATA[@]} -eq 0 ]; then
    echo "❌ No TTFB data collected. Check your URL or network."
    exit 1
fi

calculate_percentile() {
    local percentile=$1
    local sorted=($(printf '%s\n' "${TTFB_DATA[@]}" | sort -n))
    local index=$(echo "(${#sorted[@]} - 1) * $percentile / 100" | bc -l)
    local int_index=${index%.*}
    echo "${sorted[$int_index]}"
}

echo
echo "Percentiles:"
echo "p75: $(calculate_percentile 75) seconds"
echo "p90: $(calculate_percentile 90) seconds"
echo "p95: $(calculate_percentile 95) seconds"
echo "p99: $(calculate_percentile 99) seconds"
