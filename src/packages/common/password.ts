import bcrypt from "bcrypt";

class Password {
  /**
   * Generates password hashes
   **/

  private rounds: number = 10;

  hash = async (str: string): Promise<string> => {
    return await bcrypt.hash(str, this.rounds);
  };

  compare = async (pass: string, pass2: string): Promise<boolean> => {
    return await bcrypt.compare(pass, pass2);
  };
}

export default Password;
