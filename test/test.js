import http from "k6/http";

const size = 150 * 1024 * 1024; // 100MB

export default function () {
  http.get(
    // `https://public.api.lab.nonprod.enablement.awsint.linz.govt.nz/v1/public-apis/bytes/${size}`
    `https://public.api.lab.nonprod.enablement.awsint.linz.govt.nz/v1/public-apis/stream-bytes/${size}`
  );
}
