export interface ICommand {
  execute(): Promise<void>;
}

export interface IUndoableCommand extends ICommand {
  undo(): Promise<void>;
}

export abstract class CommandManager {
  protected histories: ICommand[] = [];

  async executeCommand(command: ICommand): Promise<void> {
    await command.execute();
    this.histories.push(command);
  }
}

export abstract class UndoableCommandManager extends CommandManager {
  protected histories: IUndoableCommand[] = [];

  async undo(): Promise<void> {
    if (this.histories.length) {
      const command = this.histories.pop();
      if (command) {
        await command.undo();
      }
    } else {
      console.log('There is no command for undo.');
    }
  }
}
