import { UndoableCommandManager } from '@libs/common/patterns/command.pattern';

export class CreateProductManager extends UndoableCommandManager {
  async execute() {
    try {
      console.log('Create product flow is start');
      await super.execute();
      console.log('✅ Create product flow completed successfully');
    } catch (err) {
      console.error('❌ Error during Create product flow:', err);
      throw err;
    }
  }

  async rollback() {
    console.log('⚙️ Create product flow: Rolling back...');
    await super.rollback();
    console.log('↩️ Create product flow: Rollback complete.');
  }
}
