import { ExecutionContext } from "@nestjs/common";

import { createParamDecorator } from "@nestjs/common";

const cookieFactory = (data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.cookies?.[data] : request.cookies;
};

export const Cookies = createParamDecorator(cookieFactory);

export const exportForTest = {
  cookieFactory,
};
