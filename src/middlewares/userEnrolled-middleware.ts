import enrollmentsService from "@/services/enrollments-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateUserEnrolled(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const enrollment = await enrollmentsService.validateUserEnrolled(userId);

    res.locals.enrollmentId = enrollment.id;

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
