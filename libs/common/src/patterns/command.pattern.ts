export interface ICommand {
  execute(): Promise<void>;
}

export interface IUndoableCommand extends ICommand {
  undo(): Promise<void>;
}

export abstract class CommandManager {
  protected histories: ICommand[] = [];
  protected executeCommands: ICommand[] = [];

  constructor(commands: ICommand[]) {
    this.executeCommands = commands;
  }

  addCommand(command: ICommand) {
    this.executeCommands.push(command);
  }

  async executeCommand(command: ICommand): Promise<void> {
    await command.execute();
    this.histories.push(command);
  }

  async execute() {
    for (const command of this.executeCommands) {
      await command.execute();
      this.histories.push(command);
    }
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

  async execute() {
    try {
      await super.execute();
    } catch (err: any) {
      await this.rollback();
      throw err;
    }
  }

  async rollback() {
    for (const command of this.histories.reverse()) {
      try {
        await command.undo();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (rollbackErr) {
        /* catch error */
      }
    }
  }
}
