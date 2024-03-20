
export function generateResetToken(length: number): string {
    const passwordResetToken = Math.random().toString(36).substr(2, 10);
    return passwordResetToken;
  }