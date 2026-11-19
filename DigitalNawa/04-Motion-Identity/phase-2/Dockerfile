# DN-MOTION-001 local render toolchain
# Build from this directory: docker build -t dn-motion-render:local .
# Run with the host Docker socket mounted; see README.md for the security warning.
FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg docker.io bash ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
CMD ["bash"]
