/* eslint-disable prettier/prettier */
import { Request as ExpressRequest } from 'express';

export interface userPayload {
  uid: string;
}

export interface JwtTokenPayload extends ExpressRequest {
  user: userPayload;
}
