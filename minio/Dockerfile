# install MinIO Client
FROM golang:1.17-alpine as builder

ENV GOPATH /go
ENV CGO_ENABLED 0
ENV GO111MODULE on

RUN apk add --no-cache git && \
    git clone https://github.com/minio/mc && cd mc && \
    go install -v -ldflags "$(go run buildscripts/gen-ldflags.go)"

FROM minio/minio:RELEASE.2022-02-12T00-51-25Z

COPY --from=builder /go/bin/mc /usr/bin/mc
COPY --from=builder /go/mc/CREDITS /licenses/CREDITS
COPY --from=builder /go/mc/LICENSE /licenses/LICENSE

COPY ./mb.sh /tmp/
RUN chmod +x /tmp/mb.sh

ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "/tmp/mb.sh & /usr/bin/docker-entrypoint.sh server /data --console-address :9001" ]
