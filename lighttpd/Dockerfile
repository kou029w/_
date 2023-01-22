FROM alpine AS lighttpd
RUN apk --no-cache add lighttpd
FROM scratch
COPY --from=lighttpd /usr/sbin/lighttpd /usr/sbin/
COPY --from=lighttpd /lib /lib
COPY --from=lighttpd /usr/lib /usr/lib
WORKDIR /var/tmp
