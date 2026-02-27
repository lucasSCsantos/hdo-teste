import { Request, Response } from 'express';
import { ListAuditLogUseCase } from '../../application/usecases/ListAuditLogsUseCase';

export class ListAuditLogController {
  constructor(private useCase: ListAuditLogUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response) {
    const result = await this.useCase.execute();
    return res.status(200).json(result);
  }
}
