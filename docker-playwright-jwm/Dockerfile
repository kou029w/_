FROM mcr.microsoft.com/playwright:jammy
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Asia/Tokyo
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  jwm \
  novnc \
  supervisor \
  x11vnc \
  xterm \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global playwright
COPY supervisord.conf /etc/supervisor/supervisord.conf
EXPOSE 8080
ENV DISPLAY=:0
CMD ["supervisord"]
