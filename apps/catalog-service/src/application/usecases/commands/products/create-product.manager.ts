import { IUndoableCommand } from '@libs/common/patterns/command.pattern';

export class CreateProductManager {
  private executedCommands: IUndoableCommand[] = [];

  constructor(private readonly commands: IUndoableCommand[]) {}

  async run() {
    try {
      for (const command of this.commands) {
        await command.execute();
        this.executedCommands.push(command);
      }
      console.log('✅ Create product flow completed successfully');
    } catch (err: any) {
      console.error('❌ Error during Create product flow:', err);
      await this.rollback();
      throw err;
    }
  }

  async rollback() {
    console.log('⚙️ Rolling back...');
    for (const command of this.executedCommands.reverse()) {
      try {
        await command.undo();
      } catch (rollbackErr) {
        console.error('⚠️ Rollback failed:', rollbackErr);
      }
    }
    console.log('↩️ Rollback complete.');
  }
}
