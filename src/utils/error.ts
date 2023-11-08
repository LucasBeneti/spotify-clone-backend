export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const reportMessage = ({ message }: { message: string }) => {
  // TODO send to log service
  console.log("Error!!", message);
};
