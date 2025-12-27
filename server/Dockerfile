FROM golang:1.25-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git ca-certificates

# Cache dependency downloads
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the API server binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/server ./cmd/api

# --- Runtime stage ---
FROM alpine:3.20

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /bin/server /app/server
COPY --from=builder /app/.env.example /app/.env.example

EXPOSE 8080

CMD ["/app/server"]
