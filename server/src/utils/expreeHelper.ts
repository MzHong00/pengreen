import { Request } from "express";

export const extractBearerToken = (req: Request): string | undefined => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) return;

  // "Bearer <token>" 형식으로 전송된 토큰에서 "Bearer " 부분을 제거하여 토큰을 추출합니다.
  return authorizationHeader.split(" ")[1];
};
