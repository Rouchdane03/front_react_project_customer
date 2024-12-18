: "${USERNAME:?USERNAME not set or empty}"
: "${REPO:?REPO not set or empty}"
: "${TAG:?TAG not set or empty}"

ARG_WITH_AWS_API_BASE_URL="$2"
ARG_WITH_LOCAL_BACKEND_API_BASE_URL="$3"

docker buildx create --use
docker buildx build \
    --platform=linux/amd64,linux/arm64 \
    -t "${USERNAME}/${REPO}:${TAG}" \
    -t "${USERNAME}/${REPO}:latest" \
    "${ARG_WITH_AWS_API_BASE_URL}" \
    --push \
    "$1"

docker buildx build \
    --platform=linux/amd64,linux/arm64 \
    -t "${USERNAME}/${REPO}:${TAG}_local" \
    "${ARG_WITH_LOCAL_BACKEND_API_BASE_URL}" \
    --push \
    "$1"